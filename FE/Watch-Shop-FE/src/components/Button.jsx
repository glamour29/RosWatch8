import React from 'react';

const Button = ({ children, size, backGroundColor, color, onClick, disabled = false }) => {
  return (
    <button
      className={`
        bg-${backGroundColor} text-${color} rounded-md px-4 py-2
        ${size === 'sm' && 'px-2 py-1'}
        ${size === 'lg' && 'px-6 py-3'}
        hover:opacity-95 transition-all duration-200 ease-in-out
      `}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
