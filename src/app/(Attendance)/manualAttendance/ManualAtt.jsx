import React from 'react'
import {  PiNotepadLight } from "react-icons/pi";

export default function ManualAtt() {
  return (
    <section className=" md:ml-[300px]">
  <h2 className="text-3xl font-bold mb-2 text-gray-700 mt-8">
    HR Attendance Management
  </h2>
  <p className="text-gray-500 mb-3">
    Manage manual attendance entries and approval workflows
  </p>

  <form className="border border-gray-100 mt-10 w-[95%] mx-auto rounded-lg p-6">
    {/* Title */}
    <div className="flex items-center gap-2 mb-6">
      <PiNotepadLight className="text-2xl text-gray-700" />
      <h3 className="text-lg font-semibold text-gray-800">
        Manual Attendance Entry
      </h3>
    </div>

    {/* Inputs in rows */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

    <div>
  <label className="block text-sm font-medium text-gray-600 mb-1">
    Employee Name
  </label>
  <input
    type="text"
    placeholder="Enter Employee Name"
    className="w-full border border-gray-100 rounded-lg p-2 outline-none "
  />
</div>

    
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Date
        </label>
        <input
          type="date"
          className="w-full border border-gray-100 rounded-lg p-2 outline-none"
        />
      </div>

     

 
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Clock In
        </label>
        <input
          type="time"
          className="w-full border border-gray-100 rounded-lg p-2 outline-none"
        />
      </div>

      {/* Clock Out */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Clock Out
        </label>
        <input
          type="time"
          className="w-full border border-gray-100 rounded-lg p-2 outline-none"
        />
      </div>
    </div>

    {/* Notes */}
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-600 mb-1">
        Notes
      </label>
      <textarea
        rows="3"
        className="w-full border border-gray-100 rounded-lg p-2 outline-none"
        placeholder="Optional notes..."
      ></textarea>
    </div>

    {/* Submit */}
    <div>
      <button
        type="submit"
        className="mt-6 bg-[#B79031] hover:bg-[#a07f2d] text-white px-6 py-2 rounded-lg w-full"
      >
        Submit Approval
      </button>
    </div>
  </form>
</section>

  )
}
