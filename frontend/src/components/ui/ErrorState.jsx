import React from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import Button from './Button';

const ErrorState = ({ title, message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-red-50 rounded-2xl border border-dashed border-red-200 shadow-sm w-full">
      <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-red-100 flex items-center justify-center text-red-500 mb-4">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title || 'Something went wrong'}</h3>
      <p className="text-gray-500 max-w-md mb-6">{message || 'We encountered an error while loading this data. Please try again later.'}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry} className="!border-red-200 !text-red-700 hover:!bg-red-100">
          <RefreshCcw className="w-4 h-4 mr-2" /> Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
