'use client';

import useProfile from '@/Hooks/useProfile';
import { useState } from 'react';
import { FiEdit2, FiUploadCloud, FiSave, FiX } from 'react-icons/fi';

export default function MyProfile() {
  const [editPersonal, setEditPersonal] = useState(false);
  const [editLogin, setEditLogin] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  
  // استخدام بيانات الـ API
  const { profile: data, isLoading, isError, error } = useProfile();
  
  // حالة البيانات القابلة للتعديل
  const [formData, setFormData] = useState({
    phone_number: '',
    address: ''
  });

  // تهيئة البيانات عند التحميل
  useEffect(() => {
    if (data) {
      setFormData({
        phone_number: data.phone_number || '',
        address: data.address || ''
      });
    }
  }, [data]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert('Please select a file first');
      return;
    }
    console.log('Uploading file:', selectedFile);
    // هنا سيتم رفع الملف إلى السيرفر
  };

  const handlePersonalSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Data:', formData);
    // هنا سيتم إرسال البيانات المحدثة إلى السيرفر
    setEditPersonal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header Section */}
        <div className="bg-[#B79031] p-6 text-white">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-2xl font-bold text-[#B79031]">
                {data?.first_name?.[0]}{data?.last_name?.[0]}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{data?.first_name} {data?.last_name}</h1>
                <p className="text-white/90">{data?.position_id?.title} | {data?.department_id?.name}</p>
              </div>
            </div>
            <button 
              onClick={() => setEditPersonal(!editPersonal)}
              className="flex items-center gap-1 bg-white text-[#B79031] px-3 py-1 rounded-md hover:bg-gray-100"
            >
              {editPersonal ? <FiSave size={16} /> : <FiEdit2 size={16} />}
              {editPersonal ? 'Save' : 'Edit'}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {/* Personal Info Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Personal Information</h2>
            
            {editPersonal ? (
              <form onSubmit={handlePersonalSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      value={data?.first_name}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      value={data?.last_name}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setEditPersonal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#B79031] text-white rounded-md hover:bg-[#A5802B]"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">First Name</p>
                  <p className="font-medium">{data?.first_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Name</p>
                  <p className="font-medium">{data?.last_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-medium">{data?.phone_number || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">{data?.address || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Hire Date</p>
                  <p className="font-medium">{data?.hire_date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className={`font-medium ${data?.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                    {data?.status}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Job Information Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Job Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Position</p>
                <p className="font-medium">{data?.position_id?.title || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Department</p>
                <p className="font-medium">{data?.department_id?.name || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Salary</p>
                <p className="font-medium">{data?.salary ? `${data.salary} EGP` : 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Salary Range</p>
                <p className="font-medium">
                  {data?.position_id?.salary_min && data?.position_id?.salary_max 
                    ? `${data.position_id.salary_min} - ${data.position_id.salary_max} EGP` 
                    : 'N/A'}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Job Description</p>
              <p className="font-medium">{data?.position_id?.description || 'No description available'}</p>
            </div>
          </div>

          {/* Login Information Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Login Information</h2>
              <button
                onClick={() => setEditLogin(!editLogin)}
                className="flex items-center gap-1 text-[#B79031] hover:text-[#A5802B]"
              >
                {editLogin ? <FiX size={16} /> : <FiEdit2 size={16} />}
                {editLogin ? 'Cancel' : 'Edit'}
              </button>
            </div>
            
            {editLogin ? (
              <form className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={data?.user_id?.email}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="px-4 py-2 bg-[#B79031] text-white rounded-md hover:bg-[#A5802B]"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{data?.user_id?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Password</p>
                  <p className="font-medium">••••••••</p>
                </div>
              </div>
            )}
          </div>

          {/* Documents Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Documents</h2>
            <div className="flex items-center gap-4 mb-4">
              <label className="block">
                <span className="sr-only">Choose document</span>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-[#B79031] file:text-white
                    hover:file:bg-[#A5802B]"
                />
              </label>
              <button
                onClick={handleUpload}
                disabled={!selectedFile}
                className={`flex items-center gap-2 px-4 py-2 rounded-md ${selectedFile ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              >
                <FiUploadCloud /> Upload
              </button>
            </div>
            
            {selectedFile && (
              <div className="flex items-center justify-between p-3 bg-gray-100 rounded-md max-w-md">
                <p className="text-sm truncate">{selectedFile.name}</p>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}