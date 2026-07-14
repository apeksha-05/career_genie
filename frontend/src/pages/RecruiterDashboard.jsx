import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { getJobs } from '../api/jobs';

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await getJobs(token);
        setJobs(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      fetchJobs();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-[#0f1115] p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
              Recruiter Dashboard
            </h1>
            <p className="text-gray-400 text-lg">Manage your active job postings and review candidates.</p>
          </div>
          <button
            onClick={() => navigate('/dashboard/recruiter/jobs/new')}
            className="mt-6 md:mt-0 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg transition-transform hover:-translate-y-1 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Post New Job
          </button>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
            <h3 className="text-xl text-gray-300 mb-4">You haven't posted any jobs yet.</h3>
            <button
              onClick={() => navigate('/dashboard/recruiter/jobs/new')}
              className="text-purple-400 hover:text-purple-300 font-medium"
            >
              Create your first posting &rarr;
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div 
                key={job._id}
                className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 transition-all duration-300 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-xl group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all duration-500" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">{job.title}</h3>
                    <p className="text-gray-400 text-sm">{job.location}</p>
                  </div>
                  
                  <div className="flex-grow text-gray-500 text-sm line-clamp-2 mb-6">
                    {job.description}
                  </div>
                  
                  <div className="mt-auto border-t border-white/10 pt-4 flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                        {job.applicantCount || 0}
                      </span>
                      <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Applicants</span>
                    </div>
                    
                    <Link
                      to={`/dashboard/recruiter/jobs/${job._id}/applicants`}
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      View Candidates
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterDashboard;
