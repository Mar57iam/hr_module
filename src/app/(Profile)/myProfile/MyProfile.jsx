'use client';

import useProfile from '@/Hooks/useProfile';
import { useState } from 'react';
import { FiEdit2, FiUploadCloud } from 'react-icons/fi';

export default function MyProfile() {
  const [editPersonal, setEditPersonal] = useState(false);
  const [editLogin, setEditLogin] = useState(false);

  const [email, setEmail] = useState('mariam@example.com');
  const [password, setPassword] = useState('********');

  const [selectedFile, setSelectedFile] = useState(null);

  let {profile: data, isLoading, isError, error,} = useProfile()
  console.log(data);
  

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert('Please select a file first');
      return;
    }
    console.log('Uploading file:', selectedFile);
    
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('New Email:', email);
    console.log('New Password:', password);
    setEditLogin(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src="https://i.pravatar.cc/150?img=32"
              alt="Profile"
              className="w-24 h-24 rounded-full"
            />
            <div>
              <h2 className="text-2xl font-bold">Mariam Mostafa</h2>
              <p className="text-gray-500">Frontend Developer</p>
            </div>
          </div>

          {/* زر Edit Personal Info */}
          <button
            onClick={() => setEditPersonal(!editPersonal)}
            className="flex items-center gap-2 text-[#B79031] hover:underline"
          >
            <FiEdit2 />
            {editPersonal ? ' Save' : 'Edit '}
          </button>
        </div>

        <div className="mt-10 w-[90%] mx-auto">
          {/* Personal Info */}
          <div className="flex justify-between">
            <h3 className="text-gray-600 text-[18px] font-semibold">
              First Name: <span className="text-gray-500 font-[400]">{data?.first_name}</span>
            </h3>
            <h3 className="text-gray-600 mr-8 text-[18px] font-semibold">
              Last Name: <span className="text-gray-500 font-[400]">{data?.last_name}</span>
            </h3>
          </div>

          <div className="flex justify-between mt-3">
            <h3 className="text-gray-600 font-semibold">
              Hire Date: <span className="text-gray-500 font-[400]">{data?.hire_date}</span>
            </h3>
            <h3 className="text-gray-600 font-semibold">
              Phone Number: <span className="text-gray-500 font-[400]">{data?.phone_number}</span>
            </h3>
          </div>

          <div className="flex justify-between mt-3">
            <h3 className="text-gray-600 font-semibold">
              {/* Position: <span className="text-gray-500 font-[400]">{data?.position_id.title}</span> */}
            </h3>
            <h3 className="text-gray-600 mr-30 font-semibold">
              Salary: <span className="text-gray-500 font-[400]">{data?.salary}</span>
            </h3>
          </div>

          <div className="flex justify-between mt-3">
            <h3 className="text-gray-600 font-semibold">
              Department: <span className="text-gray-500 font-[400]">{data?.department_id.name}</span>
            </h3>
            <h3 className="text-gray-600 mr-30 font-semibold">
              Status: <span className="text-gray-500 font-[400]">{data?.status}</span>
            </h3>
          </div>

          {/* زر Edit Login Info */}
          <div className="flex justify-between items-center mt-10">
            <h2 className="text-xl font-bold text-gray-700">Login Data</h2>
            <button
              onClick={() => setEditLogin(!editLogin)}
              className="flex items-center gap-2 text-blue-600 hover:underline"
            >
              <FiEdit2 />
              {editLogin ? 'Cancel Login Edit' : 'Edit Login Info'}
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} className="mt-4 space-y-4">
            <div className="space-y-4 max-w-sm p-5 w-full bg-white border shadow-xl border-gray-300 rounded-2xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  readOnly={!editLogin}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none ${
                    editLogin ? 'border-gray-400 bg-white' : 'border-gray-300 bg-gray-100 cursor-default'
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  readOnly={!editLogin}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none ${
                    editLogin ? 'border-gray-400 bg-white' : 'border-gray-300 bg-gray-100 cursor-default'
                  }`}
                />
              </div>

              {editLogin && (
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Save Login Info
                </button>
              )}
            </div>
          </form>

          {/* Upload Document Section */}
<div className="mt-10">
  <h2 className="text-xl font-bold text-gray-700 mb-4">Upload Document</h2>

  <div className="flex items-center gap-4">
    <input
      type="file"
      onChange={handleFileChange}
      className="block text-sm text-gray-600 border border-gray-300 rounded-md cursor-pointer bg-white"
    />

    <button
      onClick={handleUpload}
      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
    >
      <FiUploadCloud /> Upload
    </button>
  </div>

  {/* Selected File Info + Delete Button */}
  {selectedFile && (
    <div className="mt-3 flex items-center justify-between bg-gray-100 border border-gray-300 rounded-md p-3 w-full max-w-md">
      <p className="text-sm text-gray-700 truncate">{selectedFile.name}</p>
      <button
        onClick={() => setSelectedFile(null)}
        className="text-red-500 hover:text-red-700 text-sm font-medium"
      >
        Delete
      </button>
    </div>
  )}
</div>

        </div>
      </div>
    </div>
  );
}
