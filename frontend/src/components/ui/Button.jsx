import React from 'react';

const Button = ({
  children,
  variant = 'solid', // solid, outline, ghost, danger
  size = 'md', // sm, md, lg
  className = '',
  disabled = false,
  type = 'button',
  fullWidth = false,
  ...props
}) => {
  const baseStyles = 'inline-flex justify-center items-center font-semibold transition-all rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    solid: 'bg-brand-900 text-white hover:bg-brand-800 focus:ring-brand-500 border-2 border-transparent',
    outline: 'bg-white text-brand-900 border-2 border-brand-900 hover:bg-blue-50 focus:ring-brand-500',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 shadow-none focus:ring-gray-500 border-2 border-transparent',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 border-2 border-transparent',
  };

  const sizes = {
    sm: 'py-1.5 px-3 text-xs',
    md: 'py-2 px-4 text-sm',
    lg: 'py-3 px-5 text-base',
    xl: 'py-3.5 px-6 text-lg',
  };

  const disabledStyles = 'opacity-50 cursor-not-allowed';
  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant] || variants.solid} ${sizes[size] || sizes.md} ${widthStyles} ${disabled ? disabledStyles : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
