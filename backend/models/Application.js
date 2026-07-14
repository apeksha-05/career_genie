const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobPosting',
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['applied', 'under_review', 'interview', 'rejected', 'accepted'],
    default: 'applied',
  }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
