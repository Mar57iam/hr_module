import React from 'react';

export default function Seketlon() {
  return (
    <div>
  <div className="h-4 bg-gray-200 rounded w-32" />
  <div className="h-4 bg-gray-200 rounded w-32" />
  <div className="h-4 bg-gray-200 rounded w-16" />
  <div className="h-4 bg-gray-200 rounded w-24" />
</div>

  );
}

// Spinner component
export function Spinner() {
  return (
   <div className="flex items-center justify-center py-4">
  <div className="w-6 h-6 border-4 border-gray-300 border-t-[#B79031] rounded-full animate-spin" />
</div>

  );
}
