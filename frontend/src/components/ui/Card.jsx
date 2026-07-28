import React from 'react';

const Card = ({ children, className = '', hover = false, onClick, ...props }) => {
  const baseClasses = 'bg-white rounded-2xl border border-gray-100 shadow-sm';
  const hoverClasses = hover ? 'hover:shadow-md transition-shadow cursor-pointer hover:-translate-y-1 duration-300' : '';
  
  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
