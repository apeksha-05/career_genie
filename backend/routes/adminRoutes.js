const express = require('express');
const router = express.Router();
const {
  getUsers, updateUser, deleteUser,
  getPendingJobs, approveJob, rejectJob,
  getAnalytics,
} = require('../controllers/adminController');
const { authenticate, adminOnly } = require('../middleware/auth');

// All admin routes require auth + admin role
router.use(authenticate, adminOnly);

// Analytics
router.get('/analytics', getAnalytics);

// Users
router.get('/users', getUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Jobs moderation
router.get('/jobs', getPendingJobs);
router.put('/jobs/:id/approve', approveJob);
router.put('/jobs/:id/reject', rejectJob);

module.exports = router;
