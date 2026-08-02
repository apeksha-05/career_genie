import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getJobById } from '../api/jobs';
import { applyToJob } from '../api/applications';
import { CheckCircle2 } from 'lucide-react';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [applyError, setApplyError] = useState(null);

  useEffect(() => {
    if (!token || !id) return;
    getJobById(id, token)
      .then(res => {
        setJob(res.data);
        if (res.data.hasApplied) setApplied(true);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, token]);

  const handleApply = async () => {
    setApplying(true);
    setApplyError(null);
    try {
      await applyToJob(id, token);
      setApplied(true);
    } catch (err) {
      setApplyError(err.message);
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-900" />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 text-red-600 p-6 rounded-2xl">
          <p className="font-bold mb-2">Error</p>
          <p>{error || 'Job not found.'}</p>
          <button
            onClick={() => navigate('/dashboard/student/jobs')}
            className="mt-4 text-sm font-medium text-brand-900 hover:underline"
          >
            ← Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <main className="pb-20 pt-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">

          {/* Back button */}
          <button
            onClick={() => navigate('/dashboard/student/jobs')}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8 text-sm font-medium"
          >
            ← Back to Jobs
          </button>

          {/* Header */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-blue-100 text-brand-900 text-xs font-bold px-2.5 py-1 rounded-full">
                    {job.location}
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    job.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {job.status === 'approved' ? 'Active' : job.status}
                  </span>
                  {job.matchPercentage !== undefined && (
                    <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2.5 py-1 rounded-full">
                      {job.matchPercentage}% Match
                    </span>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">{job.title}</h1>
                <p className="text-lg text-gray-600 font-medium">{job.company}</p>
                {job.salary && (
                  <p className="text-sm text-gray-500 mt-1">💰 {job.salary}</p>
                )}
              </div>

              {/* Apply action */}
              <div className="w-full md:w-64 shrink-0">
                {applied ? (
                  <div className="flex items-center gap-2 justify-center py-4 px-6 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 font-bold">
                    <CheckCircle2 className="w-5 h-5" /> Applied Successfully!
                  </div>
                ) : (
                  <button
                    onClick={handleApply}
                    disabled={applying}
                    className="w-full bg-brand-900 text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:bg-brand-800 transition-colors disabled:opacity-60"
                  >
                    {applying ? 'Applying...' : 'Apply Now'}
                  </button>
                )}
                {applyError && (
                  <p className="text-sm text-red-500 mt-2 text-center">{applyError}</p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left — Description & Requirements */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4">About the Role</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{job.description}</p>
              </div>

              {job.requirements && job.requirements.length > 0 && (
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Skills & Requirements</h2>
                  <div className="flex flex-wrap gap-3">
                    {job.requirements.map((req, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-blue-50 text-brand-900 text-sm font-medium rounded-xl border border-blue-100"
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right — Job meta */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Job Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Company</span>
                    <span className="text-gray-900 font-medium">{job.company}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Location</span>
                    <span className="text-gray-900 font-medium">{job.location}</span>
                  </div>
                  {job.salary && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Salary</span>
                      <span className="text-gray-900 font-medium">{job.salary}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500">Posted</span>
                    <span className="text-gray-900 font-medium">
                      {new Date(job.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>

              {job.matchPercentage !== undefined && (
                <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100 shadow-sm">
                  <h3 className="font-bold text-brand-900 text-lg mb-4">Your Match Score</h3>
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 shrink-0">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="40" cy="40" r="34" fill="none" stroke="#dbeafe" strokeWidth="8" />
                        <circle
                          cx="40" cy="40" r="34" fill="none"
                          stroke="var(--color-brand-900)" strokeWidth="8"
                          strokeDasharray="213.6"
                          strokeDashoffset={213.6 - (213.6 * (job.matchPercentage || 0)) / 100}
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-extrabold text-brand-900">{job.matchPercentage}%</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">
                        {job.matchPercentage >= 80 ? 'Excellent Match' : job.matchPercentage >= 50 ? 'Good Match' : 'Partial Match'}
                      </h4>
                      <p className="text-sm text-gray-500">Based on your resume skills</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobDetails;



