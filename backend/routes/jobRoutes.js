const express = require('express');
const router = express.Router();
const { getJobs, getJobById, createJob, updateJob, getJobApplicants } = require('../controllers/jobController');
const { authenticate, authorize } = require('../middleware/auth');

// Apply authentication middleware so req.user is available
router.get('/', authenticate, getJobs);
router.get('/:id', authenticate, getJobById);

// Recruiter routes
router.post('/', authenticate, authorize('recruiter', 'admin'), createJob);
router.put('/:id', authenticate, authorize('recruiter', 'admin'), updateJob);
router.get('/:id/applicants', authenticate, authorize('recruiter', 'admin'), getJobApplicants);

module.exports = router;
