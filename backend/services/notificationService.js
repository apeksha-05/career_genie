/**
 * notificationService.js
 * ----------------------
 * Central helper to create in-app notifications.
 * 
 * Future upgrade point: swap the console.log stubs below with a real
 * transactional email call (e.g. Nodemailer + SMTP, SendGrid, Resend, etc.)
 * by populating the `sendEmail` function and calling it after `notify.save()`.
 */

const Notification = require('../models/Notification');

/**
 * Create a notification record in the database.
 * @param {Object} params
 * @param {string} params.userId    - Recipient user _id
 * @param {string} params.type      - Notification type key
 * @param {string} params.title     - Short title (shown in bell list)
 * @param {string} params.body      - Longer description
 * @param {string} [params.link]    - Optional frontend route
 * @param {Object} [params.meta]    - Optional extra data
 */
const createNotification = async ({ userId, type, title, body, link = null, meta = {} }) => {
  try {
    const notification = new Notification({ userId, type, title, body, link, meta });
    await notification.save();

    // ─────────────────────────────────────────────────────────────────────────
    // EMAIL UPGRADE HOOK
    // To send an email, retrieve the user's email here and call your email
    // provider SDK. Example with Nodemailer / SendGrid:
    //
    //   const User = require('../models/User');
    //   const user = await User.findById(userId).select('email name');
    //   await sendEmail({ to: user.email, subject: title, text: body });
    //
    // ─────────────────────────────────────────────────────────────────────────

    return notification;
  } catch (err) {
    // Non-fatal: log but don't crash the request that triggered this
    console.error('[NotificationService] Failed to create notification:', err.message);
  }
};

// ── Convenience wrappers for each trigger ──────────────────────────────────

/**
 * Triggered when a new job is posted that matches a student's skills.
 */
const notifyNewJobMatch = (studentId, job, matchPct) =>
  createNotification({
    userId: studentId,
    type: 'new_job_match',
    title: `New job match: ${job.title} at ${job.company}`,
    body: `You have a ${matchPct}% skill match for "${job.title}" at ${job.company}. Check it out!`,
    link: `/dashboard/student/jobs/${job._id}`,
    meta: { jobId: job._id, matchPercentage: matchPct },
  });

/**
 * Triggered when a recruiter updates a student's application status.
 */
const notifyStatusChange = (studentId, job, newStatus) => {
  const STATUS_LABELS = {
    applied:      'Applied',
    under_review: 'Under Review',
    interview:    'Interview Scheduled',
    accepted:     'Accepted 🎉',
    rejected:     'Not Selected',
  };
  const label = STATUS_LABELS[newStatus] || newStatus;
  return createNotification({
    userId: studentId,
    type: 'status_change',
    title: `Application update: ${job.title}`,
    body: `Your application for "${job.title}" at ${job.company} has been updated to: ${label}.`,
    link: `/dashboard/student/applications`,
    meta: { jobId: job._id, status: newStatus },
  });
};

/**
 * Triggered when a recruiter's job posting is approved by admin.
 * (Currently called manually; hook this into an admin approval flow later.)
 */
const notifyJobApproved = (recruiterId, job) =>
  createNotification({
    userId: recruiterId,
    type: 'job_approved',
    title: `Your job posting was approved`,
    body: `"${job.title}" at ${job.company} is now live and visible to students.`,
    link: `/dashboard/recruiter`,
    meta: { jobId: job._id },
  });

/**
 * Triggered when a student applies to a recruiter's job.
 */
const notifyNewApplicant = (recruiterId, job, studentName) =>
  createNotification({
    userId: recruiterId,
    type: 'new_applicant',
    title: `New applicant for ${job.title}`,
    body: `${studentName} just applied to "${job.title}". Review their profile now.`,
    link: `/dashboard/recruiter/jobs/${job._id}/applicants`,
    meta: { jobId: job._id },
  });

module.exports = {
  createNotification,
  notifyNewJobMatch,
  notifyStatusChange,
  notifyJobApproved,
  notifyNewApplicant,
};
