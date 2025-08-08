'use client';

import useDocuments from '@/Hooks/useDocuments';
import React, { useState } from 'react';
import AddDocumentModal from '../DocModal';
import Loader from '@/app/_Components/Loader/loader';


export default function AllDocumentsTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { documents, isLoading, isError, refetch } = useDocuments();
  if (isLoading) return <Loader/>
  if (isError) return <p className='ml-[300px] text-red-500'>Something went wrong!</p>;

  return (
    <div className='ml-[300px] p-6 overflow-x-auto'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold text-gray-700'>All Documents</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className='bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded'
        >
          Add Document
        </button>
      </div>

      <table className='w-full min-w-[800px] rounded-lg divide-y divide-gray-200'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider'>ID</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider'>Title</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider'>Employee</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider'>Department</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider'>Download</th>
          </tr>
        </thead>

        <tbody className='bg-white divide-y divide-gray-200'>
          {documents?.map((doc) => {
            const employee = doc.employee_id;
            const fullName = employee ? `${employee.first_name} ${employee.last_name}` : 'N/A';
            const department = employee?.department_id?.name || 'N/A';
            const fileUrl = `http://site46339-a7pcm8.scloudsite101.com/storage/${doc.document}`;

            return (
              <tr key={doc.id}>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>{doc.id}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>{doc.title}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>{fullName}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>{department}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-blue-600'>
                  <a
                    href={fileUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='hover:underline text-blue-500 font-medium'
                  >
                    Download
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* مودال الإضافة */}
      <AddDocumentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={refetch}
      />
    </div>
  );
}
