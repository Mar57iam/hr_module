'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FiUser, FiMail, FiLock, FiKey } from 'react-icons/fi';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useUsers from '@/Hooks/useUsers';
import { z } from 'zod';

// ✅ 1) Schema ZOD
const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  password_confirmation: z.string().min(6, 'Please confirm your password'),
  role: z.enum(['employee', 'admin', 'hr', 'manager'], { required_error: 'Role is required' }),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords do not match",
  path: ["password_confirmation"],
});

export default function RegisterUserForm() {
  const { addUser } = useUsers();
  const [apiErrors, setApiErrors] = useState({});
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // ✅ 2) Submit
  const onSubmit = async (data) => {
    try {
      await addUser.mutateAsync(data);
      toast.success('User registered successfully!');
      router.push('/users');
    } catch (error) {
      console.error(error);
      if (error?.errors) {
        setApiErrors(error.errors);
      }
      toast.error('Something went wrong.');
    }
  };

  return (
    <section className="min-h-screen flex flex-col px-4 pt-10 md:ml-[280px]">
      <Toaster toastOptions={{ style: { fontSize: '16px', padding: '25px' } }} />

      <div className="md:ml-48 md:mb-12">
        <h2 className="text-3xl font-bold text-gray-700">Register User</h2>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col rounded-xl bg-white shadow-md w-full max-w-4xl mx-auto p-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          {/* Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Name</label>
            <div className="relative">
              <FiUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                {...register('name')}
                placeholder="Full Name"
                className="pl-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5"
              />
            </div>
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            {apiErrors.name && <p className="text-red-500 text-xs mt-1">{apiErrors.name[0]}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                {...register('email')}
                placeholder="name@example.com"
                className="pl-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5"
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            {apiErrors.email && <p className="text-red-500 text-xs mt-1">{apiErrors.email[0]}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                {...register('password')}
                placeholder="********"
                className="pl-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5"
              />
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            {apiErrors.password && <p className="text-red-500 text-xs mt-1">{apiErrors.password[0]}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
            <div className="relative">
              <FiKey className="absolute left-3 top-3 text-gray-400" />
              
              <input
                type="password"
                {...register('password_confirmation')}
                placeholder="********"
                className="pl-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5"
              />
            </div>
            {errors.password_confirmation && (
              <p className="text-red-500 text-xs mt-1">{errors.password_confirmation.message}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Role</label>
            <select
              {...register('role')}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5"
            >
              <option value="">Select role</option>
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
              <option value="hr">HR</option>
              <option value="manager">Manager</option>
            </select>
            {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
            {apiErrors.role && <p className="text-red-500 text-xs mt-1">{apiErrors.role[0]}</p>}
          </div>
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer mb-3 mt-5 text-white flex items-center justify-center gap-2 bg-[#B79031] hover:bg-white hover:text-black hover:border border-gray-600 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Add User
        </button>
      </form>
    </section>
  );
}

