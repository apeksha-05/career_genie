const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fileUrl: {
    type: String, // Path to local storage or S3
    required: true,
  },
  parsedText: {
    type: String,
    required: true,
  },
  extractedSkills: {
    type: [String],
    default: [],
  },
  analysisResult: {
    score: { type: Number, default: 0 },
    strengths: [String],
    weaknesses: [String],
    suggestions: [String]
  },
  version: {
    type: Number,
    default: 1,
  }
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
