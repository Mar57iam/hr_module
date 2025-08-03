'use client';

import React from 'react';
import { FiSearch } from 'react-icons/fi';

export default function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  onSearch,
  className = '',
}) {
  return (
    <div className={`relative w-full sm:w-[500px] ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-md pl-10 pr-20 py-2 text-sm focus:outline-none"
      />

      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
        <FiSearch />
      </span>

      <button
        onClick={onSearch}
        className="absolute inset-y-0 right-0 flex items-center px-4 bg-[#B79031] text-white rounded-r-md hover:bg-[#a07f2d] transition text-sm"
      >
        Search
      </button>
    </div>
  );
}


