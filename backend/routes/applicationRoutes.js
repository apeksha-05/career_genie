const express = require('express');
const router = express.Router();
const {
  applyToJob,
  getMyApplications,
  getApplicantsByJob,
  updateApplicationStatus,
} = require('../controllers/applicationController');
const { authenticate, authorize } = require('../middleware/auth');

// Student routes
router.post('/', authenticate, authorize('student'), applyToJob);
router.get('/', authenticate, authorize('student'), getMyApplications);

// Recruiter routes
router.get('/:jobId', authenticate, authorize('recruiter', 'admin'), getApplicantsByJob);
router.patch('/:id/status', authenticate, authorize('recruiter', 'admin'), updateApplicationStatus);

module.exports = router;
