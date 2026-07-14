import React from 'react';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const getMatchBadgeStyle = (percentage) => {
    if (percentage >= 80) return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
    if (percentage >= 50) return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
    return 'bg-red-500/20 text-red-400 border border-red-500/30';
  };

  return (
    <div 
      className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1 cursor-pointer"
      onClick={() => navigate(`/dashboard/student/jobs/${job._id}`)}
    >
      {/* Decorative gradient orb behind */}
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-2xl group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all duration-500" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white tracking-tight mb-1">{job.title}</h3>
            <p className="text-gray-400 font-medium">{job.company}</p>
          </div>
          {job.matchPercentage !== undefined && (
            <div className={`px-3 py-1 rounded-full text-xs font-bold ${getMatchBadgeStyle(job.matchPercentage)} shadow-sm`}>
              {job.matchPercentage}% Match
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {job.location}
          </span>
          {job.salary && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {job.salary}
            </span>
          )}
        </div>

        <p className="text-gray-400 text-sm line-clamp-2 mb-6">
          {job.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {job.requirements && job.requirements.slice(0, 3).map((req, idx) => (
            <span key={idx} className="px-2 py-1 text-xs rounded-md bg-white/5 text-gray-300 border border-white/5">
              {req}
            </span>
          ))}
          {job.requirements && job.requirements.length > 3 && (
            <span className="px-2 py-1 text-xs rounded-md bg-white/5 text-gray-400 border border-white/5">
              +{job.requirements.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
