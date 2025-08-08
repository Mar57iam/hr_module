'use client';

import { useState } from "react";
import useAttendance from "@/Hooks/useAttendance";

export default function AttendanceReports() {
  const { data, isLoading, isError } = useAttendance();

  // حالة الفلاتر
  const [filterFrom, setFilterFrom] = useState('');
  const [filterTo, setFilterTo] = useState('');
  const [filterEmployee, setFilterEmployee] = useState('All Employees');
  const [filteredData, setFilteredData] = useState(null);

  // قائمة الموظفين المتاحة بناءً على البيانات
  const employeesList = data?.attendances
    ? Array.from(new Set(data.attendances.map(item => item.employee_name)))
    : [];

  // وظيفة تصفية البيانات عند الضغط على زر البحث
  const handleSearch = () => {
    if (!data?.attendances) return;

    let filtered = data.attendances;

    // فلترة حسب اسم الموظف إذا مختلف عن 'All Employees'
    if (filterEmployee !== 'All Employees') {
      filtered = filtered.filter(item => item.employee_name === filterEmployee);
    }

    // فلترة حسب التواريخ
    if (filterFrom) {
      filtered = filtered.filter(item => new Date(item.date) >= new Date(filterFrom));
    }
    if (filterTo) {
      filtered = filtered.filter(item => new Date(item.date) <= new Date(filterTo));
    }

    setFilteredData(filtered);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading attendance reports.</p>;

  // البيانات اللي هنعرضها: بيانات مفلترة لو موجودة أو البيانات الأصلية
  const displayData = filteredData ?? data.attendances;

  return (
    <div className="p-6 md:ml-[280px]">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">Attendance Reports</h1>

      {/* Filters */}
      <div className="flex flex-wrap items-end gap-4 mb-6">
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">From</label>
          <input
            type="date"
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B79031]"
            value={filterFrom}
            onChange={(e) => setFilterFrom(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">To</label>
          <input
            type="date"
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B79031]"
            value={filterTo}
            onChange={(e) => setFilterTo(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Employee</label>
          <select
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B79031]"
            value={filterEmployee}
            onChange={(e) => setFilterEmployee(e.target.value)}
          >
            <option>All Employees</option>
            {employeesList.map(emp => (
              <option key={emp} value={emp}>{emp}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSearch}
          className="h-[42px] px-4 py-2 bg-[#B79031] text-white rounded-md hover:bg-[#a07f2d] transition"
        >
          Search
        </button>

        <button
          onClick={() => setFilteredData(null)} // لإعادة العرض الكامل بدون فلترة
          className="h-[42px] px-4 py-2 bg-black text-white rounded-md hover:bg-white hover:border hover:border-black hover:text-black transition"
        >
          Reset
        </button>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto rounded-lg shadow-sm bg-white">
        <table className="w-full sm:min-w-[800px] divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">Employee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">Clock In</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">Clock Out</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayData?.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.employee_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.check_in}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.check_out || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
