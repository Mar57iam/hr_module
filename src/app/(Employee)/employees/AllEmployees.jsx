'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import useEmployees from '@/Hooks/useEmployees';
import EmployeeFilter from './EmployeeFilter';

export default function AllEmployees() {
  const [filters, setFilters] = useState({
    status: '',
    department: '',
    position: '',
  });

  const { getAllEm } = useEmployees();
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

  const columns = useMemo(() => ([
    { label: 'ID', key: 'id' },
    { label: 'Name', key: 'name' },
    { label: 'Department', key: 'department' },
    { label: 'Position', key: 'position' },
    { label: 'Status', key: 'status' },
    { label: 'Hire Date', key: 'hireDate' },
    { label: 'Phone', key: 'phone' },
    { label: 'Actions', key: 'actions' },
  ]), []);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <span className="loader" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-red-500 font-semibold">
        Something went wrong while loading employees.
      </div>
    );
  }

  return (
    <section className="mt-4 px-4 mx-auto md:ml-[300px]">
      <div className="md:mt-3 mb-3">
        <h2 className="text-2xl font-bold text-gray-700 mt-14 md:mt-10">
          Employee Directory
        </h2>
      </div>

      <EmployeeFilter onFilterChange={handleFilterChange} />

      <div className="w-full overflow-x-auto rounded-lg shadow-sm bg-white">
        <table className="w-full min-w-[800px] divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {data?.employees?.map((emp) => (
              <tr key={emp.id}>
                <td className="px-6 py-4 whitespace-nowrap">{emp.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {emp.first_name} {emp.last_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {emp.department_id?.name || '—'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {emp.position_id?.title || '—'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{emp.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">{emp.hire_date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{emp.phone_number}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => router.push(`/employees/${emp.id}`)}
                    className="text-sm font-medium text-blue-600 hover:underline"
                  >
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}


