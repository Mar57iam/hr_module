'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiCalendar, FiList, FiUpload } from 'react-icons/fi';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function LeaveRequestForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [leaveTypes, setLeaveTypes] = useState([]);

  useEffect(() => {
    async function fetchLeaveTypes() {
      try {
        const { data } = await axios.get('/api/leave-types');
        setLeaveTypes(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLeaveTypes();
  }, []);

  async function submitLeave(data) {
    try {
      const formData = new FormData();
      formData.append('startDate', data.startDate);
      formData.append('endDate', data.endDate);
      formData.append('leaveType', data.leaveType);
      if (data.attachment?.[0]) {
        formData.append('attachment', data.attachment[0]);
      }
      formData.append('reason', data.reason || '');

      await axios.post('/api/leaves', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Leave request submitted successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!');
    }
  }

  return (
    <section className="min-h-screen bg-gray-50 flex flex-col px-4 pt-10 md:ml-[280px]">


      <div className=" ">
<h1 className="text-3xl  md:ml-78 mb-10 font-bold text-gray-700">Request Leave</h1>

      </div>

      <form
        onSubmit={handleSubmit(submitLeave)}
        className="flex flex-col rounded-xl bg-white shadow-md w-full max-w-3xl mx-auto p-8"
      >
        
  {/* ✅ Start & End Date في نفس السطر */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Start Date */}
          <div>
            <label htmlFor="startDate" className="block mb-2 text-sm font-medium text-gray-900">
              Start Date
            </label>
            <div className="relative">
              <FiCalendar className="absolute left-3 top-3 text-gray-400" />
              <input
                type="date"
                id="startDate"
                {...register("startDate", { required: "Start date is required" })}
                className="pl-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5"
              />
            </div>
            {errors.startDate && (
              <p className="text-red-500 text-xs mt-1">{errors.startDate.message}</p>
            )}
          </div>

          {/* End Date */}
          <div>
            <label htmlFor="endDate" className="block mb-2 text-sm font-medium text-gray-900">
              End Date
            </label>
            <div className="relative">
              <FiCalendar className="absolute left-3 top-3 text-gray-400" />
              <input
                type="date"
                id="endDate"
                {...register("endDate", { required: "End date is required" })}
                className="pl-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5"
              />
            </div>
            {errors.endDate && (
              <p className="text-red-500 text-xs mt-1">{errors.endDate.message}</p>
            )}
          </div>
        </div>


        {/* Leave Type */}
        <div className="mb-6">
          <label htmlFor="leaveType" className="block mb-2 text-sm font-medium text-gray-900">
            Leave Type
          </label>
          <div className="relative">
            <FiList className="absolute left-3 top-3 text-gray-400" />
            <select
              id="leaveType"
              {...register("leaveType", { required: "Leave type is required" })}
              className="pl-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5"
            >
              <option value="">Select leave type</option>
              {leaveTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>
          {errors.leaveType && (
            <p className="text-red-500 text-xs mt-1">{errors.leaveType.message}</p>
          )}
        </div>

        {/* Reason */}
        <div className="mb-6">
          <label htmlFor="reason" className="block mb-2 text-sm font-medium text-gray-900">
            Reason (optional)
          </label>
          <textarea
            id="reason"
            {...register("reason")}
            placeholder="Write a reason (optional)"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5"
          ></textarea>
        </div>

        {/* File Upload */}
        <div className="mb-6">
          <label htmlFor="attachment" className="block mb-2 text-sm font-medium text-gray-900">
            Upload Attachment (optional)
          </label>
          <div className="relative">
            <label
              htmlFor="attachment"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg cursor-pointer hover:bg-gray-800 transition"
            >
              <FiUpload className="text-white" />
              Choose File
            </label>

            <input
              type="file"
              id="attachment"
              {...register("attachment")}
              className="hidden"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full cursor-pointer mb-3 mt-5 text-white flex items-center justify-center gap-2 bg-[#B79031] hover:bg-white hover:text-black hover:border border-gray-600 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Submit Request
        </button>
      </form>
    </section>
  );
}
