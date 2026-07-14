const User = require('../models/User');
const JobPosting = require('../models/JobPosting');
const Application = require('../models/Application');
const Notification = require('../models/Notification');
const { notifyJobApproved } = require('../services/notificationService');

// ── GET /api/v1/admin/users ──────────────────────────────────────────────────
exports.getUsers = async (req, res) => {
  try {
    const { role, search, page = 1, limit = 20 } = req.query;
    const query = {};
    if (role) query.role = role;
    if (search) query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [users, total] = await Promise.all([
      User.find(query).select('-passwordHash').sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)).lean(),
      User.countDocuments(query),
    ]);

    res.json({ success: true, data: users, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// ── PUT /api/v1/admin/users/:id ──────────────────────────────────────────────
exports.updateUser = async (req, res) => {
  try {
    const { role } = req.body;
    const allowed = ['student', 'recruiter', 'admin'];
    if (role && !allowed.includes(role)) {
      return res.status(400).json({ success: false, error: 'Invalid role' });
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { ...(role && { role }) },
      { new: true }
    ).select('-passwordHash');
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    res.json({ success: true, data: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// ── DELETE /api/v1/admin/users/:id ──────────────────────────────────────────
exports.deleteUser = async (req, res) => {
  try {
    if (req.params.id === req.user.id) {
      return res.status(400).json({ success: false, error: 'Cannot delete yourself' });
    }
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'User deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// ── GET /api/v1/admin/jobs ───────────────────────────────────────────────────
exports.getPendingJobs = async (req, res) => {
  try {
    const { status = 'pending', page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const query = status === 'all' ? {} : { status };

    const [jobs, total] = await Promise.all([
      JobPosting.find(query)
        .populate('postedBy', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      JobPosting.countDocuments(query),
    ]);

    // Add applicant count to each job
    const jobsWithCounts = await Promise.all(jobs.map(async (job) => {
      const applicantCount = await Application.countDocuments({ jobId: job._id });
      return { ...job, applicantCount };
    }));

    res.json({ success: true, data: jobsWithCounts, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// ── PUT /api/v1/admin/jobs/:id/approve ───────────────────────────────────────
exports.approveJob = async (req, res) => {
  try {
    const job = await JobPosting.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    );
    if (!job) return res.status(404).json({ success: false, error: 'Job not found' });

    // Notify the recruiter
    if (job.postedBy) {
      await notifyJobApproved(job.postedBy, job);
    }

    res.json({ success: true, data: job });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// ── PUT /api/v1/admin/jobs/:id/reject ────────────────────────────────────────
exports.rejectJob = async (req, res) => {
  try {
    const job = await JobPosting.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected', isActive: false },
      { new: true }
    );
    if (!job) return res.status(404).json({ success: false, error: 'Job not found' });
    res.json({ success: true, data: job });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// ── GET /api/v1/admin/analytics ─────────────────────────────────────────────
exports.getAnalytics = async (req, res) => {
  try {
    const now = new Date();
    const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);

    const [
      totalUsers, totalJobs, totalApplications, totalNotifications,
      studentCount, recruiterCount, adminCount,
      pendingJobs, approvedJobs, rejectedJobs,
      recentUsers, recentJobs, recentApplications,
      applicationsByStatus,
    ] = await Promise.all([
      User.countDocuments(),
      JobPosting.countDocuments(),
      Application.countDocuments(),
      Notification.countDocuments(),
      User.countDocuments({ role: 'student' }),
      User.countDocuments({ role: 'recruiter' }),
      User.countDocuments({ role: 'admin' }),
      JobPosting.countDocuments({ status: 'pending' }),
      JobPosting.countDocuments({ status: 'approved' }),
      JobPosting.countDocuments({ status: 'rejected' }),
      // Signups per day (last 7 days) for sparkline
      User.aggregate([
        { $match: { createdAt: { $gte: new Date(now - 7 * 24 * 60 * 60 * 1000) } } },
        { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),
      // Job postings per day (last 7 days)
      JobPosting.aggregate([
        { $match: { createdAt: { $gte: new Date(now - 7 * 24 * 60 * 60 * 1000) } } },
        { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),
      // Applications per day (last 7 days)
      Application.aggregate([
        { $match: { createdAt: { $gte: new Date(now - 7 * 24 * 60 * 60 * 1000) } } },
        { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),
      // Applications by status
      Application.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
    ]);

    res.json({
      success: true,
      data: {
        totals: {
          users: totalUsers,
          jobs: totalJobs,
          applications: totalApplications,
          notifications: totalNotifications,
        },
        usersByRole: { student: studentCount, recruiter: recruiterCount, admin: adminCount },
        jobsByStatus: { pending: pendingJobs, approved: approvedJobs, rejected: rejectedJobs },
        applicationsByStatus: Object.fromEntries(applicationsByStatus.map(x => [x._id, x.count])),
        trends: {
          users: recentUsers,
          jobs: recentJobs,
          applications: recentApplications,
        },
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
