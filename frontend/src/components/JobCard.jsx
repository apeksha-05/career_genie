import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './ui/Card';
import ApplicationStatusBadge from './ui/ApplicationStatusBadge';

const JobCard = ({ job, variant = 'vertical' }) => {
  const navigate = useNavigate();

  if (!job) return null;

  const getMatchBadgeStyle = (percentage) => {
    if (percentage >= 80) return 'bg-emerald-100 text-emerald-700';
    if (percentage >= 50) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  const getInitials = (name) => {
    if (!name) return '??';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  if (variant === 'compact') {
    return (
      <Card 
        hover 
        className="p-5 flex items-center"
        onClick={() => job._id && navigate(`/dashboard/student/jobs/${job._id}`)}
      >
        <div className="w-12 h-12 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center text-brand-600 font-bold mr-4 shrink-0">
          {job.companyLogo ? (
            <img src={job.companyLogo} alt={job.company} className="w-full h-full object-cover rounded-xl" />
          ) : (
            getInitials(job.company)
          )}
        </div>
        <div className="flex-grow min-w-0">
          <h4 className="text-base font-bold text-gray-900 truncate">{job.title || 'Untitled Position'}</h4>
          <p className="text-sm text-gray-500 truncate">{job.company || 'Unknown Company'} {job.location ? `• ${job.location}` : ''}</p>
        </div>
        <div className="text-right flex flex-col items-end shrink-0 ml-4">
          {job.matchPercentage !== undefined && (
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold mb-2 ${getMatchBadgeStyle(job.matchPercentage)}`}>
              <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              {job.matchPercentage}% Match
            </span>
          )}
          {job.postedAt && (
            <span className="text-xs text-gray-400">Posted {job.postedAt}</span>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card 
      hover 
      className="p-6 flex flex-col h-full"
      onClick={() => job._id && navigate(`/dashboard/student/jobs/${job._id}`)}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title || 'Untitled Position'}</h3>
          <p className="text-sm font-medium text-gray-600">{job.company || 'Unknown Company'}</p>
        </div>
        {job.matchPercentage !== undefined && (
          <div className={`px-2.5 py-1 rounded-full text-xs font-bold ${getMatchBadgeStyle(job.matchPercentage)}`}>
            {job.matchPercentage}% Match
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 flex-wrap">
        {job.location && (
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {job.location}
          </span>
        )}
        {job.salary && (
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {job.salary}
          </span>
        )}
      </div>

      <p className="text-gray-600 text-sm line-clamp-2 mb-6 flex-1 break-words">
        {job.description || 'No description available for this position.'}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto">
        {Array.isArray(job.requirements) && job.requirements.slice(0, 3).map((req, idx) => (
          <span key={idx} className="px-2 py-1 text-xs rounded-md bg-gray-50 text-gray-600 border border-gray-100 font-medium truncate max-w-[150px]">
            {req}
          </span>
        ))}
        {Array.isArray(job.requirements) && job.requirements.length > 3 && (
          <span className="px-2 py-1 text-xs rounded-md bg-gray-50 text-gray-500 border border-gray-100 font-medium">
            +{job.requirements.length - 3} more
          </span>
        )}
      </div>
    </Card>
  );
};

export default JobCard;
