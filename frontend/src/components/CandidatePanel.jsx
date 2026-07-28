import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getJobApplicants, getJobById } from '../api/jobs';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';

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
    if (percentage >= 80) return 'bg-emerald-100 text-emerald-700';
    if (percentage >= 50) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  if (loading) {
    return (
      <div className="flex bg-gray-50 min-h-screen font-sans">
        <Sidebar role="recruiter" />
        <main className="flex-1 flex flex-col h-screen">
          <TopHeader showNav={false} />
          <div className="flex-1 flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-900"></div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="flex bg-gray-50 min-h-screen font-sans">
        <Sidebar role="recruiter" />
        <main className="flex-1 flex flex-col h-screen">
          <TopHeader showNav={false} />
          <div className="flex-1 p-8">
            <div className="max-w-4xl mx-auto bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl font-medium">
              {error || 'Job not found.'}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50 min-h-screen font-sans">
      <Sidebar role="recruiter" />
      <main className="flex-1 flex flex-col h-screen">
        <TopHeader showNav={false} />

        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <button 
              onClick={() => navigate('/dashboard/recruiter')}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8 text-sm font-medium"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </button>

            <header className="mb-10 pb-8 border-b border-gray-100">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Candidates for <span className="text-brand-900">{job.title}</span>
                  </h1>
                  <p className="text-gray-500 flex items-center gap-4">
                    <span>{job.location}</span>
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    <span>{applicants.length} Total Applicants</span>
                  </p>
                </div>
                <Link
                  to={`/dashboard/recruiter/jobs/${job._id}/edit`}
                  className="px-5 py-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-medium rounded-xl transition-colors shadow-sm"
                >
                  Edit Job Post
                </Link>
              </div>
            </header>

            {applicants.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No Candidates Yet</h3>
                <p className="text-gray-500">Sit tight! Applications will appear here once students start applying.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {applicants.map((app, index) => (
                  <div 
                    key={app._id} 
                    className={`relative bg-white rounded-2xl border shadow-sm p-6 flex flex-col md:flex-row gap-6 md:items-center justify-between hover:shadow-md transition-shadow ${index === 0 && app.matchPercentage >= 80 ? 'border-emerald-200' : 'border-gray-100'}`}
                  >
                    {index === 0 && app.matchPercentage >= 80 && (
                      <div className="absolute top-0 right-0 px-4 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-bl-xl border-b border-l border-emerald-200">
                        TOP MATCH
                      </div>
                    )}
                    <div className="flex-grow">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{app.studentId.name}</h3>
                        <div className={`px-2.5 py-1 rounded-full text-xs font-bold ${getMatchBadgeStyle(app.matchPercentage)}`}>
                          {app.matchPercentage}% Match
                        </div>
                      </div>
                      <p className="text-gray-500 text-sm mb-4">{app.studentId.email}</p>
                      <div className="flex flex-wrap gap-2">
                        {app.skills && app.skills.slice(0, 5).map((skill, idx) => (
                          <span key={idx} className="px-2 py-1 text-xs rounded-md bg-gray-50 text-gray-600 border border-gray-100 font-medium">
                            {skill}
                          </span>
                        ))}
                        {app.skills && app.skills.length > 5 && (
                          <span className="px-2 py-1 text-xs rounded-md bg-gray-50 text-gray-500 border border-gray-100 font-medium">
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
                          className="px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors text-center"
                        >
                          View Resume
                        </a>
                      )}
                      <a 
                        href={`mailto:${app.studentId.email}?subject=Regarding your application for ${job.title}`}
                        className="px-4 py-2 bg-brand-900 hover:bg-brand-800 text-white text-sm font-bold rounded-lg shadow-sm transition-colors text-center inline-block"
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
      </main>
    </div>
  );
};

export default CandidatePanel;
