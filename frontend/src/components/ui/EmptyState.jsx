import React from 'react';

const EmptyState = ({ icon: Icon, title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-dashed border-gray-200 shadow-sm w-full">
      {Icon && (
        <div className="w-16 h-16 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center text-gray-400 mb-4">
          <Icon className="w-8 h-8" />
        </div>
      )}
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title || 'No data found'}</h3>
      <p className="text-gray-500 max-w-md mb-6">{description || 'There is nothing to display here right now.'}</p>
      {action && <div>{action}</div>}
    </div>
  );
};

export default EmptyState;
