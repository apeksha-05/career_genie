const axios = require('axios');

const baseURL = 'http://localhost:5000/api/v1';

async function runTests() {
  try {
    console.log('1. Creating admin user...');
    const adminRes = await axios.post(`${baseURL}/auth/signup`, {
      name: 'Admin User',
      email: `admin${Date.now()}@test.com`,
      password: 'password123',
      role: 'admin'
    });
    const adminToken = adminRes.data.data.token;
    const adminId = adminRes.data.data.id;
    console.log('Admin user created:', adminId);

    console.log('2. Creating recruiter user...');
    const recruiterRes = await axios.post(`${baseURL}/auth/signup`, {
      name: 'Recruiter User',
      email: `recruiter${Date.now()}@test.com`,
      password: 'password123',
      role: 'recruiter'
    });
    const recruiterToken = recruiterRes.data.data.token;
    
    console.log('3. Recruiter creates a job...');
    const jobRes = await axios.post(`${baseURL}/jobs`, {
      title: 'Software Engineer',
      company: 'Tech Corp',
      location: 'Remote',
      description: 'Test job description'
    }, {
      headers: { Cookie: `token=${recruiterToken}` }
    });
    const jobId = jobRes.data.data._id;
    console.log('Job created (pending):', jobId);

    console.log('4. Student tries to view jobs...');
    const studentRes = await axios.post(`${baseURL}/auth/signup`, {
      name: 'Student User',
      email: `student${Date.now()}@test.com`,
      password: 'password123',
      role: 'student'
    });
    const studentToken = studentRes.data.data.token;

    const jobsRes = await axios.get(`${baseURL}/jobs`, {
      headers: { Cookie: `token=${studentToken}` }
    });
    const unapprovedJobVisible = jobsRes.data.data.some(j => j._id === jobId);
    console.log('Is pending job visible to student?', unapprovedJobVisible);
    if (unapprovedJobVisible) throw new Error('Job is visible before approval!');

    console.log('5. Admin approves the job...');
    await axios.put(`${baseURL}/admin/jobs/${jobId}/approve`, {}, {
      headers: { Cookie: `token=${adminToken}` }
    });

    console.log('6. Student checks jobs again...');
    const jobsRes2 = await axios.get(`${baseURL}/jobs`, {
      headers: { Cookie: `token=${studentToken}` }
    });
    const approvedJobVisible = jobsRes2.data.data.some(j => j._id === jobId);
    console.log('Is approved job visible to student?', approvedJobVisible);
    if (!approvedJobVisible) throw new Error('Approved job is not visible!');

    console.log('7. Admin rejects the job...');
    await axios.put(`${baseURL}/admin/jobs/${jobId}/reject`, {}, {
      headers: { Cookie: `token=${adminToken}` }
    });

    console.log('8. Student checks jobs after rejection...');
    const jobsRes3 = await axios.get(`${baseURL}/jobs`, {
      headers: { Cookie: `token=${studentToken}` }
    });
    const rejectedJobVisible = jobsRes3.data.data.some(j => j._id === jobId);
    console.log('Is rejected job visible to student?', rejectedJobVisible);
    if (rejectedJobVisible) throw new Error('Rejected job is visible!');

    console.log('9. Admin updates student user role...');
    const studentId = studentRes.data.data.id;
    const updateRes = await axios.put(`${baseURL}/admin/users/${studentId}`, {
      role: 'recruiter'
    }, {
      headers: { Cookie: `token=${adminToken}` }
    });
    console.log('User role updated to:', updateRes.data.data.role);

    console.log('10. Admin deletes user...');
    await axios.delete(`${baseURL}/admin/users/${studentId}`, {
      headers: { Cookie: `token=${adminToken}` }
    });
    console.log('User deleted.');

    console.log('All tests passed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Test failed:', error.response ? error.response.data : error.message);
    process.exit(1);
  }
}

runTests();
