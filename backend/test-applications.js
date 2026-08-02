/**
 * test-applications.js
 *
 * End-to-end test verifying the full application flow:
 * 1. Student applies to a job
 * 2. Application appears in student's /applications with status "applied"
 * 3. Recruiter sees the applicant
 * 4. Recruiter updates status to each stage
 * 5. Status change reflects on student's /applications view
 * 6. Duplicate application is correctly rejected
 * 7. Non-recruiter cannot update application status
 */
const axios = require('axios');

const BASE = 'http://localhost:5000/api/v1';
let passed = 0, failed = 0;

async function req(method, url, data, token) {
  const headers = { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) };
  const config = { method, url: `${BASE}${url}`, headers };
  if (method !== 'get' && data !== null && data !== undefined) config.data = data;
  try {
    const resp = await axios(config);
    return { ok: true, status: resp.status, data: resp.data };
  } catch (err) {
    return { ok: false, status: err.response?.status, data: err.response?.data };
  }
}

function assert(label, condition) {
  if (condition) { console.log(`  ✔  ${label}`); passed++; }
  else           { console.error(`  ✘  ${label}`); failed++; }
}

async function run() {
  const ts = Date.now();

  console.log('\n[Setup] Creating users...');
  const adminR  = await req('post', '/auth/signup', { name: 'Admin',     email: `admin${ts}@t.com`,     password: 'pass1234', role: 'admin'     });
  const recR    = await req('post', '/auth/signup', { name: 'Recruiter', email: `rec${ts}@t.com`,       password: 'pass1234', role: 'recruiter' });
  const stuR    = await req('post', '/auth/signup', { name: 'Student',   email: `student${ts}@t.com`,   password: 'pass1234', role: 'student'   });
  const adminT  = adminR.data.data.token;
  const recT    = recR.data.data.token;
  const stuT    = stuR.data.data.token;

  console.log('[Setup] Recruiter creates a job...');
  const jobR = await req('post', '/jobs',
    { title: 'Backend Dev', company: 'TestCo', location: 'Remote', description: 'Build APIs', requirements: ['nodejs', 'mongodb'] },
    recT
  );
  const jobId = jobR.data.data._id;

  console.log('[Setup] Admin approves the job...');
  await req('put', `/admin/jobs/${jobId}/approve`, {}, adminT);

  // ── Test 1: Student applies ─────────────────────────────────────────────
  console.log('\n[Test 1] Student applies to a job');
  const applyR = await req('post', '/applications', { jobId }, stuT);
  assert('Apply returns 201',                  applyR.status === 201);
  assert('Application has status "applied"',   applyR.data?.data?.status === 'applied');
  assert('Application has correct jobId',      applyR.data?.data?.jobId  === jobId);
  const appId = applyR.data?.data?._id;

  // ── Test 2: Student can see their application ───────────────────────────
  console.log('\n[Test 2] Student views /applications');
  const myAppsR = await req('get', '/applications', null, stuT);
  assert('GET /applications returns 200',          myAppsR.status === 200);
  assert('Application list is not empty',          myAppsR.data?.data?.length >= 1);
  const myApp = myAppsR.data?.data?.find(a => a._id === appId);
  assert('The applied job appears in list',         !!myApp);
  assert('Status is "applied"',                    myApp?.status === 'applied');
  assert('jobId is populated (has title field)',    !!myApp?.jobId?.title);
  assert('matchPercentage is a number',            typeof myApp?.matchPercentage === 'number');

  // ── Test 3: Duplicate application rejected ──────────────────────────────
  console.log('\n[Test 3] Duplicate application is rejected');
  const dupR = await req('post', '/applications', { jobId }, stuT);
  assert('Duplicate returns 409',               dupR.status === 409);
  assert('Error message mentions already applied', dupR.data?.error?.toLowerCase().includes('already'));

  // ── Test 4: Recruiter sees the applicant ───────────────────────────────
  console.log('\n[Test 4] Recruiter views applicants for the job');
  // Via /applications/:jobId (applicationRoutes)
  const applicantsR = await req('get', `/applications/${jobId}`, null, recT);
  assert('Recruiter GET /applications/:jobId returns 200', applicantsR.status === 200);
  const foundApplicant = applicantsR.data?.data?.find(a => a._id === appId);
  assert('Application appears in recruiter view',          !!foundApplicant);
  assert('Student info is populated',                      !!foundApplicant?.studentId?.name);

  // ── Test 5: Recruiter updates status through all stages ────────────────
  console.log('\n[Test 5] Recruiter updates application status');
  const statuses = ['under_review', 'interview', 'accepted'];
  for (const newStatus of statuses) {
    const updateR = await req('patch', `/applications/${appId}/status`, { status: newStatus }, recT);
    assert(`PATCH status to "${newStatus}" returns 200`,   updateR.status === 200);
    assert(`Returned status is "${newStatus}"`,            updateR.data?.data?.status === newStatus);

    // Verify it's reflected in the student's view immediately
    const stuViewR = await req('get', '/applications', null, stuT);
    const updatedApp = stuViewR.data?.data?.find(a => a._id === appId);
    assert(`Student sees status "${newStatus}" after update`, updatedApp?.status === newStatus);
  }

  // ── Test 6: Recruiter rejects ───────────────────────────────────────────
  console.log('\n[Test 6] Recruiter rejects the application');
  const rejectR = await req('patch', `/applications/${appId}/status`, { status: 'rejected' }, recT);
  assert('PATCH to "rejected" returns 200',  rejectR.status === 200);
  const stuFinalR = await req('get', '/applications', null, stuT);
  const finalApp = stuFinalR.data?.data?.find(a => a._id === appId);
  assert('Student sees "rejected" status',   finalApp?.status === 'rejected');

  // ── Test 7: Invalid status is rejected ─────────────────────────────────
  console.log('\n[Test 7] Invalid status value is rejected');
  const badR = await req('patch', `/applications/${appId}/status`, { status: 'hired' }, recT);
  assert('Invalid status returns 400',       badR.status === 400);

  // ── Test 8: Unauthorized status update ─────────────────────────────────
  console.log('\n[Test 8] Student cannot update application status');
  const unauthR = await req('patch', `/applications/${appId}/status`, { status: 'accepted' }, stuT);
  assert('Student update returns 403',       unauthR.status === 403);

  // ── Summary ─────────────────────────────────────────────────────────────
  console.log(`\n${'─'.repeat(55)}`);
  console.log(`Results: ${passed} passed, ${failed} failed`);
  process.exit(failed > 0 ? 1 : 0);
}

run().catch(err => {
  console.error('Unexpected crash:', err.message);
  process.exit(1);
});
