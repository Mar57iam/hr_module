'use client';

import { useState, useEffect, useContext } from 'react';
import { FiEdit2, FiSave, FiX, FiUploadCloud } from 'react-icons/fi';
import useProfile from '@/Hooks/useProfile';
import axios from 'axios';
import { AuthContext } from '@/Context/AuthContext';

export default function MyProfile() {
  const { profile: data, isLoading, isError, error } = useProfile();

  const [editInfo, setEditInfo] = useState(false);
  const [editLogin, setEditLogin] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const {token}  = useContext(AuthContext)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    address: '',
  });

  useEffect(() => {
    if (data) {
      setFormData({
        first_name: data.first_name || '',
        last_name: data.last_name || '',
        phone_number: data.phone_number || '',
        address: data.address || '',
      });
    }
  }, [data]);

  const handleInfoSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setUpdateError(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('first_name', formData.first_name);
      formDataToSend.append('last_name', formData.last_name);
      formDataToSend.append('phone_number', formData.phone_number);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('_method', 'put');

      if (avatarFile) {
        formDataToSend.append('avatar', avatarFile);
      }

      const response = await axios.post(
        'https://site46339-a7pcm8.scloudsite101.com/api/employee/profile/personal',
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
           
            'Authorization': `Bearer ${token}`
          }
        }
      );

    
      setEditInfo(false);
   
      console.log('Update successful:', response.data);

    } catch (error) {
      console.error('Update failed:', error);
      setUpdateError(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleAvatarChange = (e) => {
    setAvatarFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert('Select a file first');
      return;
    }
    console.log('Uploading file:', selectedFile);
    setSelectedFile(null);
  };

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  if (isError) return <div className="p-8 text-center text-red-600">{error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        
       
        <div className="bg-white rounded-lg shadow p-6 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 capitalize flex items-center justify-center rounded-full bg-gray-200 text-white text-2xl font-bold">
              {data?.first_name?.[0]}{data?.last_name?.[0]}
            </div>
            <div>
              <h1 className="text-2xl capitalize font-bold">{data?.first_name} {data?.last_name}</h1>
              <p className="text-gray-600">{data?.position_id?.title} | {data?.department_id?.name}</p>
              <span className={`inline-block mt-1 px-3 py-1 text-sm rounded-full ${
                data?.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {data?.status}
              </span>
            </div>
          </div>
        </div>

       
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between pb-3 mb-4">
            <h2 className="text-lg font-semibold">Employee Information</h2>
            <button 
              onClick={() => setEditInfo(!editInfo)} 
              className="text-[#B79031] hover:text-[#A5802B]"
              disabled={isUpdating}
            >
              {editInfo ? <FiX /> : <FiEdit2 />}
            </button>
          </div>

          {updateError && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {updateError}
            </div>
          )}

          {editInfo ? (
            <form onSubmit={handleInfoSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
              <div>
                <label className="block text-sm text-gray-500 mb-1">First Name</label>
                <input
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  className="input-editable w-full"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Last Name</label>
                <input
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  className="input-editable w-full"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Phone Number</label>
                <input
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  className="input-editable w-full"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Address</label>
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="input-editable w-full"
                />
              </div>
              
          
              <div className="col-span-2">
                <label className="block text-sm text-gray-500 mb-1">Profile Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-[#B79031] file:text-white
                    hover:file:bg-[#A5802B]"
                />
              </div>

            
              <div>
                <label className="block text-sm text-gray-500 mb-1">Hire Date</label>
                <input readOnly value={data?.hire_date} className="input-disabled w-full" />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Employee ID</label>
                <input readOnly value={data?.employee_id} className="input-disabled w-full" />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Department</label>
                <input readOnly value={data?.department_id?.name} className="input-disabled w-full" />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Position</label>
                <input readOnly value={data?.position_id?.title} className="input-disabled w-full" />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Salary</label>
                <input readOnly value={`${data?.salary} EGP`} className="input-disabled w-full" />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Salary Range</label>
                <input
                  readOnly
                  value={`${data?.position_id?.salary_min} - ${data?.position_id?.salary_max} EGP`}
                  className="input-disabled w-full"
                />
              </div>

              <div className="col-span-2 flex justify-end gap-2 mt-4">
                <button 
                  type="button" 
                  onClick={() => setEditInfo(false)} 
                  className="btn-secondary"
                  disabled={isUpdating}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary flex items-center gap-2"
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <FiSave /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem label="First Name" value={data?.first_name} />
              <InfoItem label="Last Name" value={data?.last_name} />
              <InfoItem label="Phone Number" value={data?.phone_number} />
              <InfoItem label="Address" value={data?.address} />
              <InfoItem label="Hire Date" value={data?.hire_date} />
              <InfoItem label="Employee ID" value={data?.employee_id} />
              <InfoItem label="Department" value={data?.department_id?.name} />
              <InfoItem label="Position" value={data?.position_id?.title} />
              <InfoItem label="Salary" value={`${data?.salary} EGP`} />
              <InfoItem
                label="Salary Range"
                value={`${data?.position_id?.salary_min} - ${data?.position_id?.salary_max} EGP`}
              />
            </div>
          )}
        </div>

       
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between pb-3 mb-4">
            <h2 className="text-lg font-semibold">Login Credentials</h2>
            <button 
              onClick={() => setEditLogin(!editLogin)} 
              className="text-[#B79031] hover:text-[#A5802B]"
              disabled={isUpdating}
            >
              {editLogin ? <FiX /> : <FiEdit2 />}
            </button>
          </div>
          {editLogin ? (
            <form className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Email</label>
                <input readOnly value={data?.user_id?.email} className="input-disabled w-full" />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">New Password</label>
                <input type="password" placeholder="New Password" className="input-editable w-full" />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Confirm Password</label>
                <input type="password" placeholder="Confirm Password" className="input-editable w-full" />
              </div>
              <div className="flex justify-end">
                <button type="button" className="btn-primary">Update Password</button>
              </div>
            </form>
          ) : (
            <div className="space-y-2">
              <InfoItem label="Email" value={data?.user_id?.email} />
              <InfoItem label="Password" value="••••••••" />
            </div>
          )}
        </div>

       
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold pb-3 mb-4">Documents</h2>
          <div className="flex items-center gap-4 mb-4">
            <input 
              type="file" 
              onChange={handleFileChange} 
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-gray-100 file:text-gray-700
                hover:file:bg-gray-200"
            />
            <button
              onClick={handleUpload}
              disabled={!selectedFile}
              className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                selectedFile ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <FiUploadCloud /> Upload
            </button>
          </div>
          {selectedFile && (
            <div className="flex items-center justify-between p-3 bg-gray-100 rounded-md max-w-md">
              <p className="text-sm truncate">{selectedFile.name}</p>
              <button onClick={() => setSelectedFile(null)} className="text-red-500 hover:text-red-700">Remove</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value || 'N/A'}</p>
    </div>
  );
}


