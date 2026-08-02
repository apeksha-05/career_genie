const express = require('express');
const router = express.Router();
const { uploadResume, getMyResume } = require('../controllers/resumeController');
const { authenticate, studentOnly } = require('../middleware/auth');

router.post('/upload', authenticate, studentOnly, uploadResume);
router.get('/me', authenticate, studentOnly, getMyResume);

module.exports = router;
