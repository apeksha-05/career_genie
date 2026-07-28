import React from 'react';

const ApplicationStatusBadge = ({ status = 'pending', className = '' }) => {
  const statusConfig = {
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Pending' },
    accepted: { bg: 'bg-emerald-100', text: 'text-emerald-800', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Accepted' },
    rejected: { bg: 'bg-red-100', text: 'text-red-800', icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Rejected' },
    interview: { bg: 'bg-blue-100', text: 'text-blue-800', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', label: 'Interview' },
  };

  const normalizedStatus = status?.toLowerCase() || 'pending';
  const config = statusConfig[normalizedStatus] || statusConfig.pending;

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text} ${className}`}>
      <svg className="w-3.5 h-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d={config.icon} />
      </svg>
      {config.label}
    </span>
  );
};

export default ApplicationStatusBadge;
