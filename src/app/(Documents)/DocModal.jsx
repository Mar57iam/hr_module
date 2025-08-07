'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function AddDocumentModal({ isOpen, onClose, onSuccess }) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('employee_id', Number(data.employee_id)); // تحويل صريح لرقم
    formData.append('document', data.document[0]);
  
    try {
      const response = await fetch('http://site46339-a7pcm8.scloudsite101.com/api/v1/documents', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) throw new Error('Upload failed');
  
      toast.success('Document uploaded successfully');
      reset();
      onClose();
      onSuccess?.();
    } catch (error) {
      toast.error('Error uploading document');
    }
  };
  
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-[#0000001a] bg-opacity-30 z-50 flex items-center justify-center'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-[400px]'>
        <h2 className='text-xl font-bold text-gray-700 mb-4'>Add Document</h2>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Title</label>
            <input
              {...register('title', { required: true })}
              className='mt-1 w-full border border-gray-300 px-3 py-2 rounded'
              placeholder='Document title'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>Employee ID</label>
            <input
              {...register('employee_id', { required: true })}
              type='number'
              className='mt-1 w-full border border-gray-300 px-3 py-2 rounded'
              placeholder='Enter employee ID'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>Document File</label>
            <input
              {...register('document', { required: true })}
              type='file'
              className='mt-1 w-full'
            />
          </div>

          <div className='flex justify-end gap-3'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 bg-gray-300 text-gray-700 rounded'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
