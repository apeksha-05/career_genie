const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  type: {
    type: String,
    // 'new_job_match' | 'status_change' | 'job_approved' | 'new_applicant'
    required: true,
  },
  title: { type: String, required: true },
  body:  { type: String, required: true },
  link:  { type: String, default: null },   // frontend route to navigate to
  read:  { type: Boolean, default: false },
  meta:  { type: Object,  default: {} },    // flexible payload for future use
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
