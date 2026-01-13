import React from 'react';

export const Button = ({ children, className, ...props }) => (
  <button
    className={`w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    {...props}
  >
    {children}
  </button>
);
