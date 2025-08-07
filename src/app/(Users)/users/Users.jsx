'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
  FiPlus, FiEdit2, FiTrash2, FiMoreVertical
} from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useUsers from '@/Hooks/useUsers';
import EditUserModal from './EditModal';
import ConfirmModal from '@/app/(Employee)/Confirm';
import SearchInput from '@/app/(Departments)/departments/SearchInput';

export default function UsersPage() {
  const router = useRouter();
  const { users, isLoading, isError, updateUser, deleteUser } = useUsers();

  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  const dropdownRef = useRef(null);

  
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  
  const toggleDropdown = useCallback((id) => {
    setOpenDropdownId(prev => (prev === id ? null : id));
  }, []);

  const handleEdit = useCallback((user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  }, []);

  const handleDelete = useCallback((user) => {
    setUserToDelete(user);
    setIsConfirmModalOpen(true);
  }, []);

  const handleUpdateSubmit = async (data) => {
    try {
      await updateUser.mutateAsync({ id: selectedUser.id, data });
      toast.success('User updated successfully');
      setIsEditModalOpen(false);
      setSelectedUser(null);
    } catch {
      toast.error('Failed to update user');
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteUser.mutateAsync(userToDelete.id);
      toast.success('User deleted successfully');
    } catch {
      toast.error('Failed to delete user');
    } finally {
      setIsConfirmModalOpen(false);
      setUserToDelete(null);
    }
  };

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    return users.filter(user =>
      user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.id.toString().includes(searchValue)
    );
  }, [searchValue, users]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-400 text-lg">Loading users...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-red-500">
        Something went wrong while fetching users.
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-white px-4 py-8 md:ml-[280px]">
      <Toaster />
      <div className="flex justify-between mb-6 flex-wrap gap-4">
        <h2 className="text-2xl ml-8 font-bold text-gray-700">Users Management</h2>

        <button
          onClick={() => router.push('/addUser')}
          className="flex items-center gap-2 px-4 py-2 bg-[#B79031] text-white rounded-md hover:bg-[#a07f2d] transition"
        >
          <FiPlus /> Add User
        </button>
      </div>

      <SearchInput
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search by name, email, or ID"
        className="ml-5"
      />

      <div className="w-[98%] mx-auto overflow-x-auto rounded-lg shadow-sm bg-white mt-4">
        <table className="w-full sm:min-w-[800px] divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['ID', 'Name', 'Email', 'Role', 'Actions'].map((col) => (
                <th key={col} className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No data to show.
                </td>
              </tr>
            ) : (
              filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-50 relative">
                  <td className="px-6 py-4 text-sm text-gray-700">{user.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{user.role}</td>
                  <td className="px-6 py-4 text-sm relative">
                    <button
                      onClick={() => toggleDropdown(user.id)}
                      className="p-1.5 text-gray-600 hover:bg-gray-100 rounded"
                    >
                      <FiMoreVertical />
                    </button>

                    {openDropdownId === user.id && (
                      <div
                        ref={dropdownRef}
                        className="absolute right-3 -bottom-3 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50"
                      >
                        <button
                          onClick={() => handleEdit(user)}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <FiEdit2 /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user)}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                        >
                          <FiTrash2 /> Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        onSubmit={handleUpdateSubmit}
      />

      <ConfirmModal
        show={isConfirmModalOpen}
        onCancel={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmDelete}
        message={`Are you sure you want to delete "${userToDelete?.name}"?`}
      />
    </section>
  );
}
