'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FiEdit, FiX } from 'react-icons/fi';

export default function EditDepartmentModal({ department, onClose, onUpdate }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();


  useEffect(() => {
    reset({
      name: department?.name || '',
      description: department?.description || '',
      user_id: department?.user_id?.id || '',
    });
  }, [department, reset]);

  const onSubmit = (data) => {
    console.log('Updated Data:', data);
    onUpdate({
      id: department.id,
      ...data,
    });
    onClose();
  };

  return (
    <div className="relative z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-[#0000001d] backdrop-blur-sm" />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md relative">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3">
            <h3 className="text-lg font-semibold text-gray-800">Edit Department</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:bg-gray-200 p-1.5 rounded-full"
            >
              <FiX />
            </button>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit(onSubmit)} className="px-4 py-5 space-y-4">
            {/* Name */}
            <div className="relative">
              <FiEdit className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                placeholder="Department name"
                className="pl-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="relative">
              <textarea
                {...register('description', { required: 'Description is required' })}
                placeholder="Department description"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5"
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
              )}
            </div>

            {/* User ID */}
            <div className="relative">
              <input
                type="number"
                {...register('user_id', { required: 'User ID is required' })}
                placeholder="User ID"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5"
              />
              {errors.user_id && (
                <p className="text-red-500 text-xs mt-1">{errors.user_id.message}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#B79031] hover:bg-[#a07f2d] text-white px-4 py-2 rounded-md"
              >
                Update Department
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
