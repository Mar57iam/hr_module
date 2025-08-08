'use client';

import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import useEmployees from '@/Hooks/useEmployees';
import EmployeeFilter from './EmployeeFilter';
import toast from 'react-hot-toast';
import ConfirmModal from '../Confirm';
import EmEdModal from './EmEdModal';
import useTranslation from '@/Hooks/useTranslation';
import Loader from '@/app/_Components/Loader/loader';

export default function AllEmployees() {
  const [filters, setFilters] = useState({
    status: '',
    department: '',
    position: '',
  });

  const { getAllEm, deleteMutation, updateMutation } = useEmployees();
  const { t, lang, setLang } = useTranslation('employees');
  const [isRTL, setRTL] = useState(lang === 'ar');
  useEffect(() => {
    setRTL(lang === 'ar')
  }, [lang])

  const router = useRouter();

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['employees', filters],
    queryFn: () => getAllEm(filters),
    keepPreviousData: true,
  });

  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);



  const dropdownRefs = useRef({});

  const columns = useMemo(() => ([
    { label: 'ID', key: 'id' },
    { label: 'Employee Id', key: 'employee_id' },
    { label: 'Name', key: 'name' },
    { label: 'Department', key: 'department' },
    { label: 'Position', key: 'position' },
    { label: 'Status', key: 'status' },
    { label: 'Hire Date', key: 'hire_date' },
    { label: 'Phone', key: 'phone_number' },
    { label: 'Actions', key: 'actions' },
  ]), []);

  const [employees, setEmployees] = useState([])
  useEffect(() => {
    setEmployees(data?.employees?.map((emp) => (
      {
        ...emp,
        "name": emp.first_name + " " + emp.last_name,
        "department": emp.department_id?.name || '—',
        "position": emp.position_id?.title || '—',
      }
    )))
  }, [data])
  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-red-500 font-semibold">
        Something went wrong while loading employees.
      </div>
    );
  }

  return <>
    <section
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`mt-4 ml-0 mx-auto px-4 ${isRTL ? 'md:mr-[300px]' : 'md:ml-[300px]'}`}
    >
      <div className={`${isRTL ? 'md:mr-3' : 'md:ml-3'} md:mt-3 mb-3`}>
        <h2 className="mm text-2xl mt-14 md:mt-10 font-bold text-gray-700">
          {t('employee_directory')}
        </h2>
      </div>

      <EmployeeFilter onFilterChange={handleFilterChange} cols={columns} data={employees} />

      <div className="w-full overflow-x-auto rounded-lg shadow-sm bg-white">
        <table className="w-full min-w-[800px] divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                >
                  {t(col.label)}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {employees?.map((emp) => (
              <tr key={emp.id}>
                {columns.filter(col => col.key !== "actions").map((col) => (
                  <td key={col?.["key"]} className="px-6 py-4 whitespace-nowrap">
                    {emp[col?.["key"]] ?? ""}
                  </td>
                ))}

                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => router.push(`/employees/${emp.id}`)}
                    className="text-sm font-medium text-blue-600 hover:underline cursor-pointer"
                  >
                    View Profile
                  </button>

                  {openDropdownId === emp.id && (
                    <div
                      ref={(el) => (dropdownRefs.current[emp.id] = el)}
                      className={`absolute ${isRTL ? 'left-4' : 'right-4'
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


      {/* <ConfirmModal
        show={showConfirm}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        message={t('confirm_delete')}
      /> */}
    </section>
  </>
}