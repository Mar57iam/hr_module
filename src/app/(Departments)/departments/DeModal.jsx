'use client';

import React from "react";
import { FiUser } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useDepartments } from "@/Hooks/useDepartments";
import toast from "react-hot-toast";

export default function DeModal({ onClose, onDepartmentAdded }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { addDepartment } = useDepartments();

  const onSubmit = async (values) => {
    try {
      const { data } = await addDepartment.mutateAsync(values);
      console.log('Response:', data);

      toast.success('Department added successfully!');

      if (onDepartmentAdded) {
        onDepartmentAdded(data.department);
      }

      reset();
      onClose();
    } catch (error) {
      toast.error('Failed to add department!');
      console.error('Error adding department:', error);
    }
  };

  return (
    <div className="relative z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-[#0000001d] backdrop-blur-sm" />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white flex flex-col justify-center h-[400px] rounded-lg shadow-lg w-full max-w-lg relative">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3">
            <h3 className="text-lg font-semibold text-gray-800">Add Department</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:bg-gray-200 p-1.5 rounded-full"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit(onSubmit)} className="px-4 py-5 space-y-4">
            {/* Department Name */}
            <div className="relative">
              <FiUser className="absolute left-3 top-3 text-gray-400" />
              <input
                {...register("name", { required: "Department name is required" })}
                type="text"
                placeholder="Enter department name"
                className="pl-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* User ID */}
            <div>
              <input
                {...register("user_id", { required: "User ID is required" })}
                type="number"
                placeholder="Enter user ID"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5"
              />
              {errors.user_id && (
                <p className="text-red-500 text-xs mt-1">{errors.user_id.message}</p>
              )}
            </div>

            {/* Department Description */}
            <div>
              <textarea
                {...register("description", { required: "Description is required" })}
                placeholder="Enter department description"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5"
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={addDepartment.isPending}
                className="bg-[#B79031] hover:bg-[#a07f2d] text-white px-4 py-2 rounded-md flex items-center"
              >
                {addDepartment.isPending && (
                  <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                )}
                Save Department
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

