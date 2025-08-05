
import React, { useState } from 'react';


export default function EmEdModal({ employee, onClose, onSubmit }) {

  const [formData, setFormData] = useState({
    user_id: employee?.user_id?.id || '',

    first_name: employee?.first_name || '',
    last_name: employee?.last_name || '',
    phone_number: employee?.phone_number || '',
    address: employee?.address || '',
    hire_date: employee?.hire_date || '',
    status: employee?.status || '',
    position_id: employee?.position_id?.id || '',
    department_id: employee?.department_id?.id || '',
    salary: employee?.salary || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0000001b] bg-opacity-30 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl">
        <h2 className="text-xl font-semibold mb-4">Edit Employee</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid  grid-cols-2 gap-4">
           

            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 focus:outline-none"
            />

            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 focus:outline-none"
            />

            <input
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 focus:outline-none"
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 focus:outline-none"
            />

            <input
              type="date"
              name="hire_date"
              placeholder="Hire Date"
              value={formData.hire_date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 focus:outline-none"
            />

            <input
              type="text"
              name="status"
              placeholder="Status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 focus:outline-none"
            />

<input
              type="text"
              name="salary"
              placeholder="Salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 focus:outline-none"
            />

            <input
              type="text"
              name="position_id"
              placeholder="Position ID"
              value={formData.position_id}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 focus:outline-none"
            />

            <input
              type="text"
              name="department_id"
              placeholder="Department ID"
              value={formData.department_id}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 focus:outline-none"
            />

             <input
              type="text"
              name="user_id"
              placeholder="User ID"
              value={formData.user_id}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 focus:outline-none"
            />

            
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#B79031] text-white rounded hover:bg-[#a07f2d]"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
