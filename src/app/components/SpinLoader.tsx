import React from 'react';

const SpinLoader = ({ size = "8", color = "blue-500" }) => {
  return (
    <div
      className={`w-${size} h-${size} border-4 border-t-transparent border-${color} rounded-full animate-spin`}
    ></div>
  );
};

export default SpinLoader;
