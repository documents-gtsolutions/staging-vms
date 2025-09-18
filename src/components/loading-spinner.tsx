import React from 'react';

export const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-t-[#842DF0] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
    </div>
  );
};