'use client';

import React, { useState } from 'react';
import { FiUser, FiDollarSign, FiBriefcase } from 'react-icons/fi';
import { useDepartments } from '@/Hooks/useDepartments';

export default function Modal({ onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [salaryRange, setSalaryRange] = useState('');

  const { departments, isLoading } = useDepartments();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !departmentId || !salaryRange) {
      alert('Fill all fields!');
      return;
    }

    const newPosition = {
      title,
      salary_range: Number(salaryRange),
      department_id: Number(departmentId),
    };

    onSave(newPosition);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-[#0e0d0d2d]">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between px-4 py-3">
          <h3 className="text-lg font-semibold">Add Position</h3>
          <button onClick={onClose} className="text-gray-500 hover:bg-gray-200 p-1.5 rounded-full">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-4 py-5 space-y-4">
          <div className="relative">
            <FiBriefcase className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="pl-10 border border-gray-300 rounded-lg w-full p-2.5"
            />
          </div>

          <div className="relative">
            <FiUser className="absolute left-3 top-3 text-gray-400" />
            <select
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
              className="pl-10 border border-gray-300 rounded-lg w-full p-2.5"
            >
              <option value="" disabled>
                {isLoading ? 'Loading...' : 'Select Department'}
              </option>
              {departments?.map((dep) => (
                <option key={dep.id} value={dep.id}>{dep.name}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <FiDollarSign className="absolute left-3 top-3 text-gray-400" />
            <input
              type="number"
              placeholder="Salary"
              value={salaryRange}
              onChange={(e) => setSalaryRange(e.target.value)}
              className="pl-10 border border-gray-300 rounded-lg w-full p-2.5"
            />
          </div>

          <div className="flex justify-end">
            <button type="submit" className="bg-[#B79031] hover:bg-[#a07f2d] text-white px-4 py-2 rounded-md">
              Save Position
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

