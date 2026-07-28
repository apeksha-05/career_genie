const multer = require('multer');
const pdfParse = require('pdf-parse');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const Resume = require('../models/Resume');

// ── Multer storage setup ────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
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

// ── Simple keyword extractor for skill identification ───────────────────────
// Extracts known tech/skill keywords from the resume text as a fallback
// when the Python analysis service is unavailable.
const KNOWN_SKILLS = [
  'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'ruby', 'go', 'rust', 'swift', 'kotlin',
  'react', 'angular', 'vue', 'node.js', 'nodejs', 'express', 'django', 'flask', 'spring', 'fastapi',
  'sql', 'mysql', 'postgresql', 'mongodb', 'redis', 'elasticsearch', 'sqlite',
  'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'terraform', 'ci/cd', 'jenkins', 'github actions',
  'machine learning', 'deep learning', 'tensorflow', 'pytorch', 'scikit-learn', 'pandas', 'numpy',
  'html', 'css', 'sass', 'tailwind', 'graphql', 'rest', 'api', 'microservices',
  'git', 'linux', 'agile', 'scrum', 'data structures', 'algorithms', 'system design',
];

const extractSkillsFromText = (text) => {
  const lowerText = text.toLowerCase();
  return KNOWN_SKILLS.filter(skill => lowerText.includes(skill));
};

// ── Controller ──────────────────────────────────────────────────────────────
const uploadResume = async (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ success: false, error: err.message });
    }
    if (err) {
      return res.status(400).json({ success: false, error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    try {
      // 1. Read and parse the PDF
      const filePath = req.file.path;
      const dataBuffer = fs.readFileSync(filePath);
      const pdfData = await pdfParse(dataBuffer);
      const parsedText = pdfData.text;

      // 2. Extract skills from parsed text (local, always works)
      const extractedSkills = extractSkillsFromText(parsedText);

      // 3. Send text to Python Analysis Microservice (optional, graceful fallback)
      let analysisResult = null;
      try {
        const response = await axios.post(
          process.env.ANALYSIS_SERVICE_URL || 'http://localhost:8000/analyze',
          { text: parsedText },
          { timeout: 10000 }
        );
        analysisResult = response.data;
      } catch (analysisErr) {
        console.error('Analysis service unavailable, using local fallback:', analysisErr.message);
        // Local fallback analysis
        const score = Math.min(50 + extractedSkills.length * 5, 100);
        analysisResult = {
          score,
          strengths: extractedSkills.length > 0
            ? [`Identified ${extractedSkills.length} technical skills: ${extractedSkills.slice(0, 3).join(', ')}`]
            : ['Resume uploaded successfully.'],
          weaknesses: extractedSkills.length < 3
            ? ['Few technical keywords detected — add more specific skills.']
            : [],
          suggestions: ['Ensure your resume includes measurable achievements (e.g. "Reduced load time by 30%").'],
        };
      }

      // 4. Save / update resume in database
      const userId = req.user.id;
      const fileUrl = `/uploads/${req.file.filename}`;

      let resume = await Resume.findOne({ studentId: userId });

      if (resume) {
        resume.fileUrl = fileUrl;
        resume.parsedText = parsedText;
        resume.extractedSkills = extractedSkills;
        resume.analysisResult = analysisResult;
        resume.version += 1;
        await resume.save();
      } else {
        resume = new Resume({
          studentId: userId,
          fileUrl,
          parsedText,
          extractedSkills,
          analysisResult,
        });
        await resume.save();
      }

      return res.status(200).json({
        success: true,
        message: 'Resume uploaded and analyzed successfully',
        data: resume,
      });

    } catch (error) {
      console.error('Resume upload error:', error);
      return res.status(500).json({ success: false, error: 'Failed to process resume' });
    }
  });
};

module.exports = { uploadResume };

