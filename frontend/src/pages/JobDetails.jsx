import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getJobById } from '../api/jobs';
import { applyToJob, getMyApplications } from '../api/applications';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applying, setApplying] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [applyError, setApplyError] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getJobById(id, token);
        setJob(res.data);
        // Check if student already applied
        if (user?.role === 'student') {
          const appsRes = await getMyApplications(token);
          const alreadyAppliedToThis = appsRes.data.some(a => a.jobId?._id === id || a.jobId === id);
          setAlreadyApplied(alreadyAppliedToThis);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchData();
  }, [id, token, user]);

  const getMatchBadgeStyle = (percentage) => {
    if (percentage >= 80) return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
    if (percentage >= 50) return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
    return 'bg-red-500/20 text-red-400 border border-red-500/30';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1115] flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-[#0f1115] p-8">
        <div className="max-w-4xl mx-auto bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl">
          {error || 'Job not found.'}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1115] p-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Jobs
        </button>

        <div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12">
          {/* Decorative gradients */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-white/10 pb-8">
              <div>
                <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-2">{job.title}</h1>
                <p className="text-xl text-gray-400">{job.company}</p>
              </div>
              {job.matchPercentage !== undefined && (
                <div className={`px-4 py-2 rounded-full font-bold text-lg ${getMatchBadgeStyle(job.matchPercentage)} shadow-lg`}>
                  {job.matchPercentage}% Match
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-6 text-gray-300 mb-10">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-white/5 rounded-lg text-blue-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                {job.location}
              </div>
              {job.salary && (
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-white/5 rounded-lg text-emerald-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  {job.salary}
                </div>
              )}
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">Job Description</h2>
              <div className="text-gray-400 leading-relaxed whitespace-pre-wrap">
                {job.description}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Requirements & Skills</h2>
              <div className="flex flex-wrap gap-3">
                {job.requirements && job.requirements.map((req, idx) => (
                  <span key={idx} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300">
                    {req}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-end gap-4">
              {applyError && (
                <p className="text-red-400 text-sm">{applyError}</p>
              )}
              {user?.role === 'student' ? (
                alreadyApplied ? (
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 text-emerald-400 text-sm font-semibold">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Applied
                    </span>
                    <Link
                      to="/dashboard/student/applications"
                      className="px-6 py-2.5 bg-white/10 hover:bg-white/15 border border-white/10 text-white font-medium rounded-xl transition-colors"
                    >
                      Track Application
                    </Link>
                  </div>
                ) : (
                  <button
                    disabled={applying}
                    onClick={async () => {
                      setApplying(true);
                      setApplyError(null);
                      try {
                        await applyToJob(id, token);
                        setAlreadyApplied(true);
                      } catch (err) {
                        setApplyError(err.message);
                      } finally {
                        setApplying(false);
                      }
                    }}
                    className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:opacity-60 text-white font-bold rounded-xl shadow-lg transition-transform hover:-translate-y-1"
                  >
                    {applying ? 'Applying…' : 'Apply Now'}
                  </button>
                )
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
