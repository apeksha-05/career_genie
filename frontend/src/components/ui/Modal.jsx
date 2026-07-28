import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  maxWidth = 'max-w-md',
  hideCloseButton = false
}) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div 
          className={`relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 w-full ${maxWidth}`}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          {(title || !hideCloseButton) && (
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              {title && <h3 className="text-lg font-bold text-gray-900">{title}</h3>}
              {!hideCloseButton && (
                <button
                  type="button"
                  className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors ml-auto"
                  onClick={onClose}
                >
                  <span className="sr-only">Close panel</span>
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="px-6 py-4">
            {children || <p className="text-gray-500 text-sm">No content available.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
