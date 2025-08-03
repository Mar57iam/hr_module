'use client';

import React, { useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export default function EditUserModal({ isOpen, onClose, user, onSubmit }) {
  if (!isOpen) return null;

  
  const schema = z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email'),
    password: z.string().optional(),
    role: z.enum(['employee', 'admin', 'hr', 'manager']),
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: '',
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || '',
        email: user.email || '',
        password: '',
        role: user.role || '',
      });
    }
  }, [user, reset]);

  const handleFormSubmit = (data) => {
    if (onSubmit) {
      onSubmit(data);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#00000031] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <FiX size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4">Edit User</h2>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
          <label>
            Name
            <input
              type="text"
              {...register('name')}
              className="w-full border border-gray-200 focus:outline-none p-2 rounded"
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </label>

          <label>
            Email
            <input
              type="email"
              {...register('email')}
              className="w-full border border-gray-200 focus:outline-none p-2 rounded"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </label>

          <label>
            Password 
            <input
              type="password"
              {...register('password')}
              className="w-full border border-gray-200 focus:outline-none p-2 rounded"
              autoComplete="new-password"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </label>

          <label>
            Role
            <select {...register('role')} className="w-full border border-gray-200 focus:outline-none p-2 rounded">
              <option value="">Select role</option>
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
              <option value="hr">HR</option>
              <option value="manager">Manager</option>
            </select>
            {errors.role && <p className="text-red-500">{errors.role.message}</p>}
          </label>

          <button
            type="submit"
            className="bg-[#B79031] text-white px-4 py-2 rounded"
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
}

