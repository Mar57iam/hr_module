'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  FiMoreVertical,
  FiEdit2,
  FiTrash2,
  FiUser,
} from 'react-icons/fi';
import EmployeeFilter from './EmployeeFilter';
import useEmployees from '@/Hooks/useEmployees';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import ConfirmModal from '../Confirm';
import { useTranslation } from 'react-i18next';
import EmEdModal from './EmEdModal';

export default function AllEmployees() {
  const { t, i18n } = useTranslation('employees');
  const isRTL = i18n.language === 'ar';

  const { getAllEm, deleteMutation , updateMutation } = useEmployees();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['employees'],
    queryFn: getAllEm,
  });

  const router = useRouter();
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
 


  const dropdownRefs = useRef({});

  const toggleDropdown = (id) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        openDropdownId &&
        dropdownRefs.current[openDropdownId] &&
        !dropdownRefs.current[openDropdownId].contains(e.target)
      ) {
        setOpenDropdownId(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdownId]);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

  const handleEditClick = (emp) => {
    setSelectedEmployee(emp);
    setIsEditModalOpen(true);
  };

  const handleConfirmDelete = () => {
    toast.promise(deleteMutation.mutateAsync(selectedId), {
      loading: t('deleting'),
      success: t('success_delete'),
      error: t('error_delete'),
    });
    setShowConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setSelectedId(null);
  };

  if (isLoading) return <p>{t('loading')}</p>;
  if (isError) return <p>{t('error')}</p>;

  return (
    <section
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`mt-4 ml-0 mx-auto px-4 ${
        isRTL ? 'md:mr-[300px]' : 'md:ml-[300px]'
      }`}
    >
      <div className={`${isRTL ? 'md:mr-3' : 'md:ml-3'} md:mt-3 mb-3`}>
        <h2 className=" mm text-2xl mt-14 md:mt-10 font-bold text-gray-700">
          {t('employee_directory')}
        </h2>
      </div>

      <EmployeeFilter />

      <div className="w-full overflow-x-auto rounded-lg shadow-sm bg-white">
        <table className="w-full min-w-[800px] divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                {t('id')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                {t('name')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                {t('department')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                {t('position')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                {t('status')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                {t('hire_date')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                {t('phone')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                {t('actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.employees?.map((emp) => (
              <tr key={emp.id} className="relative">
                <td className="px-6 py-4 whitespace-nowrap">{emp.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {emp.first_name} {emp.last_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {emp.department_id?.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {emp.position_id?.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{emp.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">{emp.hire_date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {emp.phone_number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown(emp.id);
                    }}
                    className="p-1.5 rounded hover:bg-gray-100"
                  >
                    <FiMoreVertical />
                  </button>

                  {openDropdownId === emp.id && (
                    <div
                      ref={(el) => (dropdownRefs.current[emp.id] = el)}
                      className={`absolute ${
                        isRTL ? 'left-4' : 'right-4'
                      } -top-[20px] w-40 bg-white border border-gray-200 rounded shadow z-50`}
                    >
                      <button
                        onClick={() => router.push(`/employees/${emp.id}`)}
                        className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FiUser className="mr-2" /> {t('view_profile')}
                      </button>
                      <button
                       onClick={() => handleEditClick(emp)}
                        className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                          >
                         <FiEdit2 className="mr-2" /> {t('edit')}
                          </button>

                      <button
                        onClick={() => handleDeleteClick(emp.id)}
                        className="flex w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <FiTrash2 className="mr-2" /> {t('delete')}
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>




      {isEditModalOpen && selectedEmployee && (
  <EmEdModal
    employee={selectedEmployee}
    onClose={() => setIsEditModalOpen(false)}
    onSubmit={(updatedData) => {
      updateMutation.mutate(
        {
          id: selectedEmployee.id,
          updatedData,
        },
        {
          onSuccess: () => {
            toast.success('Employee updated Succesfully!');
            setIsEditModalOpen(false);
          },
          onError: () => {
            toast.error('Failed to update employee');
          },
        }
      );
    }}
  />
)}


      <ConfirmModal
        show={showConfirm}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        message={t('confirm_delete')}
      />
    </section>
  );
}


