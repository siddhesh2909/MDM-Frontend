import React from 'react';

export const Input = ({ className, ...props }) => (
  <input
    className={`w-full p-3 rounded-lg border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ${className}`}
    {...props}
  />
);
