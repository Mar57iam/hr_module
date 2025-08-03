'use client'

import React from 'react';
import { useForm } from 'react-hook-form';
import { FiUser, FiEdit2, FiTrash2 } from 'react-icons/fi';

export default function ProfileClean() {


 const {register} = useForm()


  return (
    <section className="min-h-screen flex bg-[#d4b35e0a]   justify-center  px-4 py-12">
      <div className="w-full max-w-4xl  bg-white rounded-1xl shadow-xl p-10">

        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6  pb-6">
          
          {/* Left Side: Avatar + Info */}
          <div className="flex items-center gap-6">
            <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              <FiUser className="text-5xl text-gray-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">John Doe</h2>
              <p className="text-gray-500">johndoe@example.com</p>
            </div>
          </div>

          {/* Right Side: Buttons */}
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
              <FiEdit2 /> Edit
            </button>
            <button className="flex items-center gap-2 px-5 py-2 rounded-full border border-red-200 text-red-600 hover:bg-red-50 transition">
              <FiTrash2 /> Delete
            </button>
          </div>
        </div>

        {/* Form Section */}
        <form className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
    <label className="text-gray-600 text-sm mb-1 block">First Name</label>
    <input
      type="text"
      placeholder="John"
      {...register('first_name')}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-[#B79031]"
    />
  </div>

  <div>
    <label className="text-gray-600 text-sm mb-1 block">Last Name</label>
    <input
      type="text"
      placeholder="Doe"
      {...register('last_name')}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-[#B79031]"
    />
  </div>

  <div>
    <label className="text-gray-600 text-sm mb-1 block">Phone Number</label>
    <input
      type="text"
      placeholder="+1 234 567 890"
      {...register('phone_number')}
      className="w-full  border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-[#B79031]"
    />
  </div>

  <div>
    <label className="text-gray-600 text-sm mb-1 block">Address</label>
    <input
      type="text"
      placeholder="123 Street, City"
      {...register('address')}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-[#B79031]"
    />
  </div>

  

  <div>
    <label className="text-gray-600 text-sm mb-1 block">Hire Date</label>
    <input
      type="date"
      placeholder="YYYY-MM-DD"
      {...register('hire_date')}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-[#B79031]"
    />
  </div>


  <div>
    <label className="text-gray-600 text-sm mb-1 block">Salary</label>
    <input
      type="number"
      placeholder="5000"
      {...register('salary')}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-[#B79031]"
    />
  </div>


  <div>
    <label className="text-gray-600 text-sm mb-1 block">Status</label>
    <input
      type="text"
      placeholder="Active"
      {...register('status')}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-[#B79031]"
    />
  </div>
  <div>
    <label className="text-gray-600 text-sm mb-1 block">User ID</label>
    <input
      type="number"
      placeholder="123"
      {...register('user_id')}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-[#B79031]"
    />
  </div>



 

  

  <div>
    <label className="text-gray-600 text-sm mb-1 block">Position ID</label>
    <input
      type="number"
      placeholder="1"
      {...register('position_id')}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-[#B79031]"
    />
  </div>

  <div>
    <label className="text-gray-600 text-sm mb-1 block">Department ID</label>
    <input
      type="number"
      placeholder="1"
      {...register('department_id')}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-[#B79031]"
    />
  </div>

 
</form>

      </div>
    </section>
  );
}








