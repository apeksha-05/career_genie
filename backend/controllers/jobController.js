const JobPosting = require('../models/JobPosting');
const Resume = require('../models/Resume');
const Application = require('../models/Application');
const User = require('../models/User');
const { notifyNewJobMatch } = require('../services/notificationService');
const { computeMatchPercentage } = require('../utils/matchScoring');

exports.getJobs = async (req, res) => {
  try {
    let query = {};
    if (req.user && req.user.role === 'recruiter') {
      // Recruiter only sees their own jobs (or we could fetch all if admin)
      query.postedBy = req.user.id;
    }
    const jobs = await JobPosting.find(query).lean();
    
    if (req.user && req.user.role === 'student') {
      const resume = await Resume.findOne({ studentId: req.user.id }).sort({ createdAt: -1 });
      const skills = resume ? resume.extractedSkills : [];
      
      const jobsWithMatch = jobs.map(job => ({
        ...job,
        matchPercentage: computeMatchPercentage(skills, job.requirements)
      }));
      return res.json({ success: true, data: jobsWithMatch });
    }

    if (req.user && (req.user.role === 'recruiter' || req.user.role === 'admin')) {
      // Add applicant counts
      const jobsWithCounts = await Promise.all(jobs.map(async (job) => {
        const applicantCount = await Application.countDocuments({ jobId: job._id });
        return { ...job, applicantCount };
      }));
      return res.json({ success: true, data: jobsWithCounts });
    }
    
    return res.json({ success: true, data: jobs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await JobPosting.findById(req.params.id).lean();
    if (!job) {
      return res.status(404).json({ success: false, error: 'Job not found' });
    }

    if (req.user && req.user.role === 'student') {
      const resume = await Resume.findOne({ studentId: req.user.id }).sort({ createdAt: -1 });
      const skills = resume ? resume.extractedSkills : [];
      job.matchPercentage = computeMatchPercentage(skills, job.requirements);
    }

    res.json({ success: true, data: job });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

exports.createJob = async (req, res) => {
  try {
    const { title, company, location, description, requirements, salary } = req.body;
    
    const job = new JobPosting({
      title,
      company,
      location,
      description,
      requirements,
      salary,
      postedBy: req.user.id,
    });
    
    await job.save();

    // Notify students whose skills overlap with this job's requirements
    // Run in background — don't await so the API response is instant
    (async () => {
      try {
        const allResumes = await Resume.find({ extractedSkills: { $exists: true, $not: { $size: 0 } } });
        const reqLower = (requirements || []).map(r => r.toLowerCase());
        for (const resume of allResumes) {
          const skillsLower = resume.extractedSkills.map(s => s.toLowerCase());
          let matches = 0;
          reqLower.forEach(req => {
            if (skillsLower.some(sk => sk.includes(req) || req.includes(sk))) matches++;
          });
          const pct = reqLower.length > 0 ? Math.min(Math.round((matches / reqLower.length) * 100), 100) : 0;
          if (pct >= 40) {
            await notifyNewJobMatch(resume.studentId, job, pct);
          }
        }
      } catch (e) {
        console.error('[createJob] Job-match notification error:', e.message);
      }
    })();

    res.status(201).json({ success: true, data: job });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const job = await JobPosting.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, error: 'Job not found' });
    }

    if (job.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Unauthorized to update this job' });
    }

    Object.assign(job, req.body);
    await job.save();

    res.json({ success: true, data: job });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

exports.getJobApplicants = async (req, res) => {
  try {
    const job = await JobPosting.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, error: 'Job not found' });
    }

    if (job.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Unauthorized' });
    }

    const applications = await Application.find({ jobId: job._id }).populate('studentId', 'name email').lean();
    
    const applicantsWithMatches = await Promise.all(applications.map(async (app) => {
      const resume = await Resume.findOne({ studentId: app.studentId._id }).sort({ createdAt: -1 });
      const skills = resume ? resume.extractedSkills : [];
      const matchPercentage = computeMatchPercentage(skills, job.requirements);
      
      return {
        ...app,
        matchPercentage,
        resumeUrl: resume ? resume.fileUrl : null,
        skills
      };
    }));

    // Sort descending by match percentage for the "top-matched candidates panel"
    applicantsWithMatches.sort((a, b) => b.matchPercentage - a.matchPercentage);

    res.json({ success: true, data: applicantsWithMatches });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
