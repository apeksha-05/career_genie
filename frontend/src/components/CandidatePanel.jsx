import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getJobApplicants, getJobById } from '../api/jobs';

const CandidatePanel = () => {
  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobRes, appsRes] = await Promise.all([
          getJobById(id, token),
          getJobApplicants(id, token)
        ]);
        setJob(jobRes.data);
        setApplicants(appsRes.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchData();
  }, [id, token]);

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
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={() => navigate('/dashboard/recruiter')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </button>

        <header className="mb-12 border-b border-white/10 pb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
                Candidates for <span className="text-purple-400">{job.title}</span>
              </h1>
              <p className="text-gray-400 flex items-center gap-4">
                <span>{job.location}</span>
                <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                <span>{applicants.length} Total Applicants</span>
              </p>
            </div>
            
            <Link
              to={`/dashboard/recruiter/jobs/${job._id}/edit`}
              className="px-5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl transition-colors"
            >
              Edit Job Post
            </Link>
          </div>
        </header>

        {applicants.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-2">No Candidates Yet</h3>
            <p className="text-gray-400">Sit tight! Applications will appear here once students start applying.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {applicants.map((app, index) => (
              <div 
                key={app._id} 
                className={`relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border ${index === 0 && app.matchPercentage >= 80 ? 'border-emerald-500/30 shadow-lg shadow-emerald-500/10' : 'border-white/10'} p-6 transition-all duration-300 flex flex-col md:flex-row gap-6 md:items-center justify-between`}
              >
                {/* Highlight top match */}
                {index === 0 && app.matchPercentage >= 80 && (
                  <div className="absolute top-0 right-0 px-4 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-bl-xl border-b border-l border-emerald-500/30">
                    TOP MATCH
                  </div>
                )}
                
                <div className="flex-grow">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-xl font-bold text-white">{app.studentId.name}</h3>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${getMatchBadgeStyle(app.matchPercentage)}`}>
                      {app.matchPercentage}% Match
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4">{app.studentId.email}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {app.skills && app.skills.slice(0, 5).map((skill, idx) => (
                      <span key={idx} className="px-2 py-1 text-xs rounded-md bg-white/5 text-gray-300 border border-white/5">
                        {skill}
                      </span>
                    ))}
                    {app.skills && app.skills.length > 5 && (
                      <span className="px-2 py-1 text-xs rounded-md bg-white/5 text-gray-400 border border-white/5">
                        +{app.skills.length - 5} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 min-w-[200px] shrink-0">
                  {app.resumeUrl && (
                    <a 
                      href={app.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium rounded-lg transition-colors text-center"
                    >
                      View Resume
                    </a>
                  )}
                  <a 
                    href={`mailto:${app.studentId.email}?subject=Regarding your application for ${job.title}`}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-sm font-bold rounded-lg shadow-md transition-colors text-center inline-block"
                  >
                    Contact Student
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidatePanel;
