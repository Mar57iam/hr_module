'use client';

// import useProfile from '@/hooks/useProfile';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { FiEdit } from 'react-icons/fi';
import useProfile from '@/Hooks/useProfile';

export default function MyProfile() {
  const { profile, isLoading, isError, error } = useProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, 
  } = useForm();

   useEffect(() => {
    if (profile) {
      reset({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        email: profile.user_id?.email || '',
        phone: profile.phone_number || '',
        address: profile.address || '',
      });
    }
  }, [profile, reset]);

  if (isLoading) return <p className="text-center text-gray-500">Loading profile...</p>;
  if (isError) return <p className="text-center text-red-500">Error: {error.message}</p>;
  if (!profile) return <p>No profile data</p>;

  const employee = {
    avatar: profile.avatar,
    first_name: profile.first_name,
    last_name: profile.last_name,
    email: profile.user_id?.email,
    phone: profile.phone_number,
    address: profile.address,
    employee_id: profile.employee_id,
    hire_date: profile.hire_date,
    status: profile.status,
    position: profile.position_id?.title,
    department: profile.department_id?.name,
    salary: `$${profile.salary}`,
    role: profile.user_id?.role,
  };

  return (
    <div className="p-6 space-y-8 ml-[280px]">
      {/* Profile Header */}
      <div className="flex items-center gap-6">
        <div className="w-28 h-28 rounded-full bg-gray-200 overflow-hidden">
          {employee.avatar ? (
            <img src={employee.avatar} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">No Avatar</div>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-semibold">{employee.first_name} {employee.last_name}</h2>
          <p className="text-sm text-gray-500">{employee.role}</p>
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Contact Info */}
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <button className="text-blue-600 hover:underline flex items-center gap-1 text-sm">
              <FiEdit />
              Edit
            </button>
          </div>
          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Phone:</strong> {employee.phone}</p>
            <p><strong>Address:</strong> {employee.address}</p>
          </div>
        </div>

        {/* Work Info */}
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Work Details</h3>
            <button className="text-blue-600 hover:underline flex items-center gap-1 text-sm">
              <FiEdit />
              Edit
            </button>
          </div>
          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>Employee ID:</strong> {employee.employee_id}</p>
            <p><strong>Position:</strong> {employee.position}</p>
            <p><strong>Department:</strong> {employee.department}</p>
            <p><strong>Hire Date:</strong> {employee.hire_date}</p>
            <p><strong>Status:</strong> {employee.status}</p>
            <p><strong>Salary:</strong> {employee.salary}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
