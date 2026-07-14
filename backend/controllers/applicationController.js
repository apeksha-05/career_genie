const Application = require('../models/Application');
const JobPosting = require('../models/JobPosting');
const Resume = require('../models/Resume');
const User = require('../models/User');
const { notifyNewApplicant, notifyStatusChange } = require('../services/notificationService');

// Student: Apply to a job
exports.applyToJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({ success: false, error: 'jobId is required' });
    }

    const job = await JobPosting.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, error: 'Job not found' });
    }

    // Prevent duplicate applications
    const existing = await Application.findOne({ jobId, studentId: req.user.id });
    if (existing) {
      return res.status(409).json({ success: false, error: 'You have already applied to this job' });
    }

    const application = new Application({
      jobId,
      studentId: req.user.id,
      status: 'applied',
    });

    await application.save();

    // Notify the recruiter who posted this job
    const student = await User.findById(req.user.id).select('name');
    await notifyNewApplicant(job.postedBy, job, student?.name || 'A student');

    res.status(201).json({ success: true, data: application });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Student: Get their own applications (with job details and match %)
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ studentId: req.user.id })
      .populate('jobId')
      .lean();

    const resume = await Resume.findOne({ studentId: req.user.id }).sort({ createdAt: -1 });
    const skills = resume ? resume.extractedSkills : [];

    const computeMatch = (resumeSkills, jobRequirements) => {
      if (!resumeSkills || !jobRequirements || jobRequirements.length === 0) return 0;
      const lower = resumeSkills.map(s => s.toLowerCase());
      const reqLower = jobRequirements.map(s => s.toLowerCase());
      let matches = 0;
      reqLower.forEach(req => {
        if (lower.some(skill => skill.includes(req) || req.includes(skill))) matches++;
      });
      return Math.min(Math.round((matches / jobRequirements.length) * 100), 100);
    };

    const enriched = applications.map(app => ({
      ...app,
      matchPercentage: app.jobId ? computeMatch(skills, app.jobId.requirements) : 0,
    }));

    res.json({ success: true, data: enriched });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Recruiter: Get all applicants for a specific job (by jobId)
exports.getApplicantsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await JobPosting.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, error: 'Job not found' });
    }

    if (job.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Unauthorized' });
    }

    const applications = await Application.find({ jobId })
      .populate('studentId', 'name email')
      .lean();

    res.json({ success: true, data: applications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Recruiter: Update application status
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['applied', 'under_review', 'interview', 'accepted', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status value' });
    }

    const application = await Application.findById(id).populate('jobId');
    if (!application) {
      return res.status(404).json({ success: false, error: 'Application not found' });
    }

    if (application.jobId.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Unauthorized' });
    }

    application.status = status;
    await application.save();

    // Notify the student about their status change
    await notifyStatusChange(application.studentId, application.jobId, status);

    res.json({ success: true, data: application });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
