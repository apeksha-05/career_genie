/**
 * test-filters.js
 *
 * End-to-end test verifying:
 *  1. Match-percentage scores change based on actual resume/job data
 *  2. Role (title) filter works
 *  3. Skills filter works
 *  4. Deadline filter works
 */
const axios = require('axios');

const BASE = 'http://localhost:5000/api/v1';

async function req(method, url, data, token) {
  const headers = { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) };
  const config = { method, url: `${BASE}${url}`, headers };
  if (method !== 'get' && data !== null && data !== undefined) config.data = data;
  const resp = await axios(config);
  return resp.data;
}

async function run() {
  const ts = Date.now();
  let passed = 0, failed = 0;

  const assert = (label, condition) => {
    if (condition) { console.log(`  ✔  ${label}`); passed++; }
    else           { console.error(`  ✘  ${label}`); failed++; }
  };

  // ── 1. Create admin ──────────────────────────────────────────────────────
  console.log('\n[Setup] Creating users…');
  const admin = (await req('post', '/auth/signup', {
    name: 'Admin', email: `admin${ts}@t.com`, password: 'pass1234', role: 'admin'
  })).data;
  const recruiter = (await req('post', '/auth/signup', {
    name: 'Recruiter', email: `rec${ts}@t.com`, password: 'pass1234', role: 'recruiter'
  })).data;

  // Two students with different skill sets
  const studentA = (await req('post', '/auth/signup', {
    name: 'Student A (React dev)', email: `sa${ts}@t.com`, password: 'pass1234', role: 'student'
  })).data;
  const studentB = (await req('post', '/auth/signup', {
    name: 'Student B (Python dev)', email: `sb${ts}@t.com`, password: 'pass1234', role: 'student'
  })).data;

  // ── 2. Seed resumes for students ─────────────────────────────────────────
  console.log('[Setup] Seeding resumes via mongoose directly (requires service endpoint)…');
  // We'll use the resume upload endpoint but seed skills via the Python analysis fallback.
  // Since the fallback extracts known keywords, craft a PDF-like payload by calling
  // a direct DB seed via a test helper route or simply rely on the keyword extractor.
  // For a pure API test we'll use the upload endpoint with a real small PDF.

  // Build minimal valid PDF buffers in base64
  const makePdf = (text) => {
    const stream = `BT /F1 12 Tf 100 700 Td (${text}) Tj ET`;
    const streamLen = stream.length;
    return Buffer.from(
      `%PDF-1.4\n1 0 obj\n<</Type /Catalog /Pages 2 0 R>>\nendobj\n` +
      `2 0 obj\n<</Type /Pages /Kids [3 0 R] /Count 1>>\nendobj\n` +
      `3 0 obj\n<</Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources <</Font <</F1 4 0 R>>>> /Contents 5 0 R>>\nendobj\n` +
      `4 0 obj\n<</Type /Font /Subtype /Type1 /BaseFont /Helvetica>>\nendobj\n` +
      `5 0 obj\n<</Length ${streamLen}>>\nstream\n${stream}\nendstream\nendobj\n` +
      `xref\n0 6\n0000000000 65535 f \n` +
      `trailer\n<</Size 6 /Root 1 0 R>>\nstartxref\n200\n%%EOF`
    );
  };

  const FormData = require('form-data');

  const uploadResume = async (token, pdfBuf, filename) => {
    const fd = new FormData();
    fd.append('resume', pdfBuf, { filename, contentType: 'application/pdf' });
    const resp = await axios.post(`${BASE}/resumes/upload`, fd, {
      headers: { ...fd.getHeaders(), Authorization: `Bearer ${token}` },
    });
    return resp.data;
  };

  // Student A: react nodejs javascript skills
  const resumeA = await uploadResume(studentA.token, makePdf('react nodejs javascript'), 'student-a.pdf');
  console.log('  Student A skills:', resumeA.data.extractedSkills);

  // Student B: python django machine learning skills
  const resumeB = await uploadResume(studentB.token, makePdf('python django machine learning pandas'), 'student-b.pdf');
  console.log('  Student B skills:', resumeB.data.extractedSkills);

  // ── 3. Create jobs ───────────────────────────────────────────────────────
  console.log('[Setup] Creating jobs…');

  const futureDeadline = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  const pastDeadline   = new Date(Date.now() - 5  * 24 * 60 * 60 * 1000).toISOString();

  const jsJob = (await req('post', '/jobs',
    { title: 'Frontend Engineer', company: 'ACME', location: 'Remote', description: 'Build UIs', requirements: ['react', 'javascript', 'nodejs'], deadline: futureDeadline },
    recruiter.token
  )).data;

  const mlJob = (await req('post', '/jobs',
    { title: 'ML Engineer', company: 'DataCo', location: 'NYC', description: 'ML pipelines', requirements: ['python', 'machine learning', 'pandas'], deadline: futureDeadline },
    recruiter.token
  )).data;

  const expiredJob = (await req('post', '/jobs',
    { title: 'Expired Opportunity', company: 'OldCo', location: 'Remote', description: 'Old job', requirements: ['javascript'], deadline: pastDeadline },
    recruiter.token
  )).data;

  const noDeadlineJob = (await req('post', '/jobs',
    { title: 'Open-ended DevOps Role', company: 'DevInc', location: 'Remote', description: 'DevOps work', requirements: ['docker', 'aws'] },
    recruiter.token
  )).data;

  // Admin approves all jobs
  for (const job of [jsJob, mlJob, expiredJob, noDeadlineJob]) {
    await req('put', `/admin/jobs/${job._id}/approve`, {}, admin.token);
  }
  console.log('  All jobs approved.');

  // ── 4. Test: match scores differ by resume ───────────────────────────────
  console.log('\n[Test 1] Match scores differ based on resume skills');
  const jobsA = (await req('get', '/jobs', null, studentA.token)).data;
  const jobsB = (await req('get', '/jobs', null, studentB.token)).data;

  const jsForA = jobsA.find(j => j._id === jsJob._id);
  const jsForB = jobsB.find(j => j._id === jsJob._id);
  const mlForA = jobsA.find(j => j._id === mlJob._id);
  const mlForB = jobsB.find(j => j._id === mlJob._id);

  console.log(`  Frontend Engineer  → Student A (react dev) match: ${jsForA?.matchPercentage}%  Student B (python dev): ${jsForB?.matchPercentage}%`);
  console.log(`  ML Engineer        → Student A (react dev) match: ${mlForA?.matchPercentage}%  Student B (python dev): ${mlForB?.matchPercentage}%`);

  assert('Student A scores higher on Frontend job than Student B', (jsForA?.matchPercentage || 0) > (jsForB?.matchPercentage || 0));
  assert('Student B scores higher on ML job than Student A',       (mlForB?.matchPercentage || 0) > (mlForA?.matchPercentage || 0));
  assert('Student A Frontend score > 0',  (jsForA?.matchPercentage || 0) > 0);
  assert('Student B ML score > 0',        (mlForB?.matchPercentage || 0) > 0);

  // ── 5. Test: role filter ─────────────────────────────────────────────────
  console.log('\n[Test 2] Role (title) filter');
  const roleFiltered = (await req('get', '/jobs?role=Frontend', null, studentA.token)).data;
  assert('Role filter returns ≥1 result',          roleFiltered.length >= 1);
  assert('All results contain "Frontend" in title', roleFiltered.every(j => j.title.toLowerCase().includes('frontend')));
  assert('ML job is NOT in role=Frontend results',  roleFiltered.every(j => j._id !== mlJob._id));

  // ── 6. Test: skills filter ───────────────────────────────────────────────
  console.log('\n[Test 3] Skills filter');
  const skillFiltered = (await req('get', '/jobs?skills=python,django', null, studentB.token)).data;
  assert('Skills filter returns ≥1 result',    skillFiltered.length >= 1);
  assert('ML job appears in skills=python results', skillFiltered.some(j => j._id === mlJob._id));
  assert('Frontend job NOT in skills=python results', skillFiltered.every(j => j._id !== jsJob._id));

  // ── 7. Test: deadline filter ─────────────────────────────────────────────
  console.log('\n[Test 4] Deadline filter');
  const todayStr = new Date().toISOString().split('T')[0];
  const deadlineFiltered = (await req('get', `/jobs?deadline=${todayStr}`, null, studentA.token)).data;
  assert('Deadline filter returns results', deadlineFiltered.length >= 1);
  assert('Expired job is excluded from deadline filter', deadlineFiltered.every(j => j._id !== expiredJob._id));
  assert('Future-deadline job is included', deadlineFiltered.some(j => j._id === jsJob._id));
  assert('Open-ended (no deadline) job is included', deadlineFiltered.some(j => j._id === noDeadlineJob._id));

  // ── Summary ──────────────────────────────────────────────────────────────
  console.log(`\n${'─'.repeat(50)}`);
  console.log(`Results: ${passed} passed, ${failed} failed`);
  if (failed > 0) process.exit(1);
  else process.exit(0);
}

run().catch(err => {
  console.error('Unexpected error:', err.response?.data || err.message);
  process.exit(1);
});
