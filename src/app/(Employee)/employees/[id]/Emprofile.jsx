'use client';

import useEmployees from '@/Hooks/useEmployees';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiUser, FiTrash2, FiEdit2, FiSave, FiX } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { AuthContext } from '@/Context/AuthContext';
import ConfirmModal from '../../Confirm';
// import ConfirmModal from '@/components/ConfirmModal';

function InputField({ label, name, register, type = 'text', readOnly = true }) {
  return (
    <div>
      <label className="text-gray-600 text-sm mb-1 block">{label}</label>
      <input
        type={type}
        {...register(name)}
        readOnly={readOnly}
        placeholder={label}
        className={`w-full px-0 py-2 border-0 border-b bg-transparent text-gray-700 border-gray-200 outline-none ${
          !readOnly ? 'focus:border-blue-500' : 'focus:outline-none'
        }`}
      />
    </div>
  );
}

export default function EmProfile() {
  const { id } = useParams();
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();
  const { getEmployeeProfile, deleteMutation } = useEmployees();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { token } = useContext(AuthContext);

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['employee', id],
    queryFn: () => getEmployeeProfile(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updatedData }) => {
      return fetch(`https://site46339-a7pcm8.scloudsite101.com/api/v1/employees/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...updatedData,
          _method: 'put'
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['employee', id]);
      queryClient.invalidateQueries(['employees']);
      toast.success('Employee updated successfully');
      setIsEditing(false);
    },
    onError: () => {
      toast.error('Failed to update employee');
    },
  });

  useEffect(() => {
    if (data?.employee) {
      reset(data.employee);
    }
  }, [data, reset]);

  const employee = data?.employee;

  const onSubmit = async (formData) => {
    try {
      await updateMutation.mutateAsync({ id, updatedData: formData });
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleDelete = () => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast.success('Employee deleted successfully');
        router.push('/employees');
      },
      onError: () => {
        toast.error('Failed to delete employee');
      },
    });
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError) return <div className="text-center py-10 text-red-500">Error loading data.</div>;

  return (
    <section className="min-h-screen flex justify-center px-4 py-12">
      <div className="w-full max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl shadow-xl p-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6">
          <div className="flex items-center gap-6">
            <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {employee?.avatar ? (
                <img
                  src={`https://site46339-a7pcm8.scloudsite101.com/storage/${employee.avatar}`}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FiUser className="text-5xl text-gray-400" />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {employee?.first_name} {employee?.last_name}
              </h2>
              <p className="text-gray-500">{employee?.user_id?.email}</p>
            </div>
          </div>

          <div className="flex gap-3">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  disabled={updateMutation.isLoading}
                  className="flex items-center gap-2 px-5 py-2 rounded-full border border-green-200 text-green-600 hover:bg-green-50 transition disabled:opacity-50"
                >
                  {updateMutation.isLoading ? 'Saving...' : (
                    <>
                      <FiSave /> Save
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    reset(data.employee);
                    setIsEditing(false);
                  }}
                  className="flex items-center gap-2 px-5 py-2 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
                >
                  <FiX /> Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-5 py-2 rounded-full border border-blue-200 text-blue-600 hover:bg-blue-50 transition"
              >
                <FiEdit2 /> Edit
              </button>
            )}

            {/* Delete Button */}
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center gap-2 px-5 py-2 rounded-full border border-red-200 text-red-600 hover:bg-red-50 transition"
            >
              <FiTrash2 /> Delete
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="First Name" name="first_name" register={register} readOnly={!isEditing} />
          <InputField label="Last Name" name="last_name" register={register} readOnly={!isEditing} />
          <InputField label="Phone Number" name="phone_number" register={register} readOnly={!isEditing} />
          <InputField label="Address" name="address" register={register} readOnly={!isEditing} />
          <InputField label="Hire Date" name="hire_date" type="date" register={register} readOnly={!isEditing} />
          <InputField label="Salary" name="salary" type="number" register={register} readOnly={!isEditing} />
          <InputField label="Status" name="status" register={register} readOnly={!isEditing} />
          <InputField label="Employee ID" name="employee_id" register={register} readOnly={!isEditing} />

          <div>
            <label className="text-gray-600 text-sm mb-1 block">Position</label>
            <input
              type="text"
              value={employee?.position_id?.title || ''}
              readOnly
              className="w-full px-0 py-2 border-0 border-b bg-transparent text-gray-700 border-gray-200 outline-none"
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm mb-1 block">Department</label>
            <input
              type="text"
              value={employee?.department_id?.name || ''}
              readOnly
              className="w-full px-0 py-2 border-0 border-b bg-transparent text-gray-700 border-gray-200 outline-none"
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm mb-1 block">Manager</label>
            <input
              type="text"
              value={employee?.user_id?.name || ''}
              readOnly
              className="w-full px-0 py-2 border-0 border-b bg-transparent text-gray-700 border-gray-200 outline-none"
            />
          </div>
        </form>
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
  show={showDeleteModal}
  onConfirm={handleDelete}
  onCancel={() => setShowDeleteModal(false)}
  message="Are you sure you want to delete this employee?"
/>

    </section>
  );
}

