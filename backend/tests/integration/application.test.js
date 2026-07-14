const request = require('supertest');
const app = require('../../server');
const mongoose = require('mongoose');
const User = require('../../models/User');
const JobPosting = require('../../models/JobPosting');
const Resume = require('../../models/Resume');
const Application = require('../../models/Application');
const jwt = require('jsonwebtoken');

describe('Application Flow Integration', () => {
  let student, recruiter, studentToken, recruiterToken, job;

  beforeEach(async () => {
    // Create users
    student = await User.create({
      name: 'Test Student',
      email: 'student@test.com',
      passwordHash: 'hashed',
      role: 'student'
    });
    recruiter = await User.create({
      name: 'Test Recruiter',
      email: 'recruiter@test.com',
      passwordHash: 'hashed',
      role: 'recruiter'
    });

    studentToken = jwt.sign({ id: student._id, role: student.role }, process.env.JWT_SECRET || 'secret_key');
    recruiterToken = jwt.sign({ id: recruiter._id, role: recruiter.role }, process.env.JWT_SECRET || 'secret_key');

    // Create a resume for the student
    await Resume.create({
      studentId: student._id,
      fileUrl: 'http://test.com/resume.pdf',
      extractedSkills: ['JavaScript', 'React', 'Node.js']
    });

    // Create a job
    const res = await request(app)
      .post('/api/v1/jobs')
      .set('Authorization', `Bearer ${recruiterToken}`)
      .send({
        title: 'Software Engineer',
        company: 'Tech Corp',
        location: 'Remote',
        description: 'Great job',
        requirements: ['JavaScript', 'React']
      });
    
    job = res.body.data;
  });

  it('should allow a student to apply to a job', async () => {
    const res = await request(app)
      .post('/api/v1/applications')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({ jobId: job._id });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBeTruthy();
    expect(res.body.data.jobId.toString()).toEqual(job._id.toString());
    expect(res.body.data.studentId.toString()).toEqual(student._id.toString());
    expect(res.body.data.status).toEqual('applied');
  });

  it('should not allow a student to apply twice to the same job', async () => {
    await request(app)
      .post('/api/v1/applications')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({ jobId: job._id });

    const res = await request(app)
      .post('/api/v1/applications')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({ jobId: job._id });

    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual('Already applied to this job');
  });

  it('should allow a recruiter to see applicants and update status', async () => {
    // Student applies
    const applyRes = await request(app)
      .post('/api/v1/applications')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({ jobId: job._id });
    const applicationId = applyRes.body.data._id;

    // Recruiter fetches applicants
    const getRes = await request(app)
      .get(`/api/v1/applications/${job._id}`)
      .set('Authorization', `Bearer ${recruiterToken}`);
    
    expect(getRes.statusCode).toEqual(200);
    expect(getRes.body.data.length).toEqual(1);
    expect(getRes.body.data[0].studentId._id.toString()).toEqual(student._id.toString());
    // Expect match percentage to be calculated (2 out of 2 requirements match = 100%)
    expect(getRes.body.data[0].matchPercentage).toEqual(100);

    // Recruiter updates status
    const updateRes = await request(app)
      .patch(`/api/v1/applications/${applicationId}/status`)
      .set('Authorization', `Bearer ${recruiterToken}`)
      .send({ status: 'interview' });

    expect(updateRes.statusCode).toEqual(200);
    expect(updateRes.body.data.status).toEqual('interview');
  });
});
