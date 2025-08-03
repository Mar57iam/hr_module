
import React from 'react';
import {
  MdPeople,
  MdEventAvailable,
  MdAccessTime,
  MdBusiness
} from 'react-icons/md';

export default function AdmainDashboard() {



  
  return (
    <>
      <div className="md:ml-[280px] grid grid-cols-1 mt-16 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
        {/* Card 1 */}
        <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <MdPeople className="text-blue-600 w-6 h-6" />
          </div>
          <div>
            <h2 className="text-gray-500 text-sm mb-1">Total Employees</h2>
            <p className="text-2xl font-bold text-gray-800">120</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-full">
            <MdEventAvailable className="text-green-600 w-6 h-6" />
          </div>
          <div>
            <h2 className="text-gray-500 text-sm mb-1">Active Today</h2>
            <p className="text-2xl font-bold text-gray-800">90</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
          <div className="bg-yellow-100 p-3 rounded-full">
            <MdAccessTime className="text-yellow-600 w-6 h-6" />
          </div>
          <div>
            <h2 className="text-gray-500 text-sm mb-1">Pending Leaves</h2>
            <p className="text-2xl font-bold text-gray-800">5</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
          <div className="bg-purple-100 p-3 rounded-full">
            <MdBusiness className="text-purple-600 w-6 h-6" />
          </div>
          <div>
            <h2 className="text-gray-500 text-sm mb-1">Departments</h2>
            <p className="text-2xl font-bold text-gray-800">8</p>
          </div>
        </div>
      </div>
    </>
  );
}
