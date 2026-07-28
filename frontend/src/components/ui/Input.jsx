import React from 'react';

const Input = React.forwardRef(({
  label,
  error,
  helperText,
  id,
  className = '',
  fullWidth = true,
  icon: Icon,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <div className={`flex flex-col ${widthClass} ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-semibold text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          id={inputId}
          ref={ref}
          className={`
            block w-full rounded-xl border-gray-300 shadow-sm
            focus:border-brand-500 focus:ring-brand-500 sm:text-sm
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
            ${error ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'}
            ${Icon ? 'pl-10' : 'px-4'}
            py-2.5 transition-colors
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-red-600" id={`${inputId}-error`}>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="mt-1.5 text-sm text-gray-500" id={`${inputId}-description`}>
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
