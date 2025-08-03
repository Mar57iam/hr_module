'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useDepartments } from '@/Hooks/useDepartments';

export default function DepDetails() {
  const { id } = useParams(); // لو بتستخدم dynamic route [id]
  const {
    departmentDetails,
    employees,
    isDepartmentLoading,
    isEmployeesLoading,
  } = useDepartments(id);

  if (isDepartmentLoading || isEmployeesLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <span className="loader" />
      </div>
    );
  }

  return (
    <section className="min-h-screen px-4 py-8 md:ml-[280px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Department Details</h1>
        <Link
          href="/departments"
          className="px-4 py-2 bg-[#B79031] text-white rounded hover:bg-[#a07f2d] transition"
        >
          Back to Departments
        </Link>
      </div>

      {/* Department Card */}
      <div className="bg-white p-10 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          {departmentDetails?.name || 'Department Name'}
        </h2>
        <p className="text-gray-600 mb-4">
          <span className="font-medium">Description:</span>{' '}
          {departmentDetails?.description || 'No description'}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Head:</span>{' '}
          {departmentDetails?.user_id?.name || 'N/A'}
        </p>
      </div>

      {/* Employees Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Employees in this Department
        </h3>
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full min-w-[600px] divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                  Employee ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                  Position
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {employees?.length > 0 ? (
                employees.map((emp) => (
                  <tr key={emp.id}>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {emp.employee_id}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {emp.first_name} {emp.last_name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {emp.position_id?.title || 'N/A'}
                    </td>
                    <td className="px-4 py-3 text-sm text-green-600">
                      {emp.status}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <button className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-4 text-center text-gray-500"
                  >
                    No employees found in this department.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

