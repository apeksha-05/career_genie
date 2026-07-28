require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

// Route imports
const authRoutes         = require('./routes/authRoutes');
const jobRoutes          = require('./routes/jobRoutes');
const applicationRoutes  = require('./routes/applicationRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const adminRoutes        = require('./routes/adminRoutes');
const resumeRoutes       = require('./routes/resumeRoutes');

const app = express();

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

// Serve uploaded files (resumes) as static assets
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── Database Connection ─────────────────────────────────────────────────────
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/careergenie')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// ── API Routes ──────────────────────────────────────────────────────────────
app.use('/api/v1/auth',          authRoutes);
app.use('/api/v1/jobs',          jobRoutes);
app.use('/api/v1/applications',  applicationRoutes);
app.use('/api/v1/notifications', notificationRoutes);
app.use('/api/v1/admin',         adminRoutes);
app.use('/api/v1/resumes',       resumeRoutes);

// ── Global Error Handler ────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Server Error' });
});

const PORT = process.env.PORT || 5000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
