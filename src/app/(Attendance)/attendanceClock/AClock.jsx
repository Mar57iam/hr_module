'use client';
import React from 'react';
import { FaClock, FaMapMarkerAlt, FaUndo } from 'react-icons/fa';

export default function AttendencePage() {
  return (
    <div className="min-h-screen md:ml-[250px] bg-white py-10 px-6 md:px-20">
      {/* Title */}
      <h2 className="text-3xl font-bold  text-gray-900 mb-2">
        Employee Time Clock
      </h2>
      <p className=" text-gray-500 mb-10">
        Track your work hours and breaks
      </p>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Status */}
        <div className="border border-gray-100 rounded-xl p-6 shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <p className="font-medium text-gray-800">Status</p>
            <FaClock className="text-gray-400" />
          </div>
          <span className="inline-block bg-gray-200 text-sm font-medium text-gray-700 px-3 py-1 rounded-lg w-max">
            Clocked Out
          </span>
        </div>

        {/* Location */}
        <div className="border  border-gray-100 rounded-xl p-6 shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <p className="font-medium text-gray-800">Location</p>
            <FaMapMarkerAlt className="text-gray-400" />
          </div>
          <span className="inline-block bg-gray-200 text-sm font-medium text-gray-700 px-3 py-1 rounded-lg w-max">
            Disabled
          </span>
          <div className="text-sm text-gray-500">
            Office Location (Mock)
            <br />
            <span className="text-gray-600 font-mono">40.7128, -74.0060</span>
          </div>
        </div>

        {/* Today's Hours */}
        <div className="border border-gray-100 rounded-xl p-6 shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <p className="font-medium text-gray-800">Today's Hours</p>
            <FaUndo className="text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900">0.0h</p>
        </div>
      </div>

      {/* Time Clock Buttons */}
      <div className="border border-gray-100 rounded-xl p-8 shadow-sm max-w-3xl mx-auto">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Time Clock</h3>
        <div className="flex gap-4 justify-center">
          <button className="flex items-center  gap-2 bg-black text-white px-5 py-2 rounded-lg font-semibold">
            <FaClock />
            Clock In
          </button>
          <button className="flex items-center gap-2 bg-gray-100 text-gray-500 px-5 py-2 rounded-lg font-semibold cursor-not-allowed" disabled>
            <FaClock />
            Clock Out
          </button>
        </div>
      </div>


      <div className=' mt-9 p-8 shadow-sm mx-auto rounded-lg'>
    
  <h3 className="text-xl font-semibold mb-6 text-gray-800">Attendance Records</h3>
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-100 text-sm text-left">
      <thead className="bg-gray-100 text-gray-700 font-semibold">
        <tr>
          <th className="px-4 py-3">Date</th>
          <th className="px-4 py-3">Clock In</th>
          <th className="px-4 py-3">Clock Out</th>
          <th className="px-4 py-3">Duration</th>
          <th className="px-4 py-3">Overtime</th>
          <th className="px-4 py-3">Late</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {/* Example Row */}
        <tr>
          <td className="px-4 py-3">2025-07-26</td>
          <td className="px-4 py-3">09:05 AM</td>
          <td className="px-4 py-3">06:15 PM</td>
          <td className="px-4 py-3">9h 10m</td>
          <td className="px-4 py-3 text-green-600">+1h 10m</td>
          <td className="px-4 py-3 text-red-600">+5m</td>
        </tr>

        {/* Row 2 */}
        <tr>
          <td className="px-4 py-3">2025-07-25</td>
          <td className="px-4 py-3">08:55 AM</td>
          <td className="px-4 py-3">05:00 PM</td>
          <td className="px-4 py-3">8h 5m</td>
          <td className="px-4 py-3 text-gray-500">—</td>
          <td className="px-4 py-3 text-green-600">On Time</td>
        </tr>

        {/* Add more rows dynamically later */}
      </tbody>
    </table>
  </div>
</div>

      

    </div>
  );
}
