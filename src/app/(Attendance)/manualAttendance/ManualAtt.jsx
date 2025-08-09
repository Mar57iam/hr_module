'use client'
import Loader from '@/app/_Components/Loader/loader';
import useAttendance from '@/Hooks/useAttendance';
import React from 'react'
import {  PiNotepadLight } from "react-icons/pi";





  export default function ManualAtt() {
    const { pendingReports } = useAttendance();
    const { data, isLoading, isError } = pendingReports;
  
    if (isLoading) return<Loader/>;
    if (isError) return <p className="ml-[300px]">Error loading pending records.</p>;
  
    
    const pendingList = data?.attendances?? [];
  
    return (
      <section className="md:ml-[300px]">
        <h2 className="text-2xl font-bold mb-2 text-gray-700 mt-8">
           Attendance Management
        </h2>
  
        <p className="text-gray-500 text-lg ml-35 mb-3 mt-9">
          Pending Records
        </p>
  
        {/* Table */}
        <div className="     md:w-[80%] mx-auto overflow-x-auto rounded-lg shadow-sm bg-white">
          <table className="w-full sm:min-w-[800px] divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Clock In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Clock Out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingList.length > 0 ? (
                pendingList.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.employee_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.check_in}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.check_out || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No pending records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <form className="border border-gray-100 mt-10 md:w-[80%] mx-auto rounded-lg p-6">
  {/* Title */}
  <div className="flex items-center gap-2 mb-6">
    <PiNotepadLight className="text-2xl text-gray-700" />
    <h3 className="text-lg font-semibold text-gray-800">
      Manual Attendance Entry
    </h3>
  </div>

  {/* Inputs in rows */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

    {/* Employee ID */}
    <div>
      <label htmlFor="employee_id" className="block text-sm font-medium text-gray-600 mb-1">
        Employee ID
      </label>
      <input
        id="employee_id"
        name="employee_id"
        type="number"
        placeholder="Enter Employee ID"
        className="w-full border border-gray-100 rounded-lg p-2 outline-none"
      />
    </div>

    {/* Date */}
    <div>
      <label htmlFor="date" className="block text-sm font-medium text-gray-600 mb-1">
        Date
      </label>
      <input
        id="date"
        name="date"
        type="date"
        className="w-full border border-gray-100 rounded-lg p-2 outline-none"
      />
    </div>

    {/* Clock In */}
    <div>
      <label htmlFor="check_in" className="block text-sm font-medium text-gray-600 mb-1">
        Clock In
      </label>
      <input
        id="check_in"
        name="check_in"
        type="time"
        className="w-full border border-gray-100 rounded-lg p-2 outline-none"
      />
    </div>

    {/* Clock Out */}
    <div>
      <label htmlFor="check_out" className="block text-sm font-medium text-gray-600 mb-1">
        Clock Out
      </label>
      <input
        id="check_out"
        name="check_out"
        type="time"
        className="w-full border border-gray-100 rounded-lg p-2 outline-none"
      />
    </div>
  </div>

  {/* Notes */}
  <div className="mt-4">
    <label htmlFor="reason" className="block text-sm font-medium text-gray-600 mb-1">
      Reason
    </label>
    <textarea
      id="reason"
      name="reason"
      rows="3"
      className="w-full border border-gray-100 rounded-lg p-2 outline-none"
      placeholder="Optional notes..."
    ></textarea>
  </div>

  {/* Submit */}
  <div className="mx-auto">
    <button
      type="submit"
      className="mt-6 bg-[#B79031] hover:bg-[#a07f2d] text-white px-6 py-2 rounded-lg"
    >
      Submit Approval
    </button>
  </div>
</form>

</section>

  )
}
