'use client';

export default function AttendanceReports() {
  return (
    <div className="p-6 md:ml-[280px]">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">Attendance Reports</h1>

      {/* Filters */}
      <div className="flex flex-wrap items-end gap-4 mb-6">
  <div className="flex flex-col">
    <label className="text-sm text-gray-600 mb-1">From</label>
    <input type="date" className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B79031]" />
  </div>

  <div className="flex flex-col">
    <label className="text-sm text-gray-600 mb-1">To</label>
    <input type="date" className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B79031]" />
  </div>

  <div className="flex flex-col">
    <label className="text-sm text-gray-600 mb-1">Employee</label>
    <select className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B79031]">
      <option>All Employees</option>
      <option>Employee 1</option>
    </select>
  </div>

  <button className="h-[42px] px-4 py-2 bg-[#B79031] text-white rounded-md hover:bg-[#a07f2d] transition">
    Search
  </button>

  <button className="h-[42px] px-4 py-2 bg-black text-white rounded-md hover:bg-white hover:border   hover:border-black  hover:text-black  transition">
    Export PDF
  </button>
</div>


      {/* Table */}
      <div className="w-full overflow-x-auto rounded-lg shadow-sm bg-white">
        <table className="w-full sm:min-w-[800px] divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">id</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">Employee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">Clock In</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">Clock Out</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">Late</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">Early Leave</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">Overtime</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">Notes</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">1</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Mariam</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">2025-07-29</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">10:12</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">13:03</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">5h</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">5 mins</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">60 mins</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">20 hrs</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">mkm</td>
            </tr>
          </tbody>
        </table>
      </div>

     
    </div>
  );
}
