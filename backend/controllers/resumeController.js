const multer = require('multer');
const pdfParse = require('pdf-parse');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const Resume = require('../models/Resume');

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'), false);
    }
  }
}).single('resume');

const uploadResume = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    try {
      // 1. Read the PDF file
      const filePath = req.file.path;
      const dataBuffer = fs.readFileSync(filePath);
      
      // 2. Parse text from PDF
      const pdfData = await pdfParse(dataBuffer);
      const parsedText = pdfData.text;

      // 3. Send text to Python Analysis Microservice
      let analysisResult = null;
      try {
        const response = await axios.post('http://localhost:8000/analyze', {
          text: parsedText
        });
        analysisResult = response.data;
      } catch (analysisErr) {
        console.error('Error connecting to analysis service:', analysisErr.message);
        // Provide a fallback or re-throw
        analysisResult = {
          score: 50,
          strengths: ['Resume uploaded successfully.'],
          weaknesses: ['Analysis service unavailable.'],
          suggestions: ['Please try analyzing again later.']
        };
      }

      // 4. Save to Database
      const userId = req.user.id;
      
      // Check if user already has a resume
      let resume = await Resume.findOne({ studentId: userId });
      
      const fileUrl = `/uploads/${req.file.filename}`;
      
      if (resume) {
        // Update existing
        resume.fileUrl = fileUrl;
        resume.parsedText = parsedText;
        resume.analysisResult = analysisResult;
        resume.version += 1;
        await resume.save();
      } else {
        // Create new
        resume = new Resume({
          studentId: userId,
          fileUrl,
          parsedText,
          analysisResult
        });
        await resume.save();
      }

      return res.status(200).json({
        success: true,
        message: 'Resume uploaded and analyzed successfully',
        data: resume
      });

    } catch (error) {
      console.error('Resume upload error:', error);
      return res.status(500).json({ success: false, error: 'Failed to process resume' });
    }
  });
};

const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ success: false, error: err.message });
  } else if (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
  next();
};

module.exports = {
  uploadResume,
  handleUploadError
};
