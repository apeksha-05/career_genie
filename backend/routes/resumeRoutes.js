const express = require('express');
const router = express.Router();
const { uploadResume, handleUploadError } = require('../controllers/resumeController');
const { authenticate, studentOnly } = require('../middleware/auth');

router.post('/upload', authenticate, studentOnly, uploadResume, handleUploadError);

module.exports = router;
