'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiMoreVertical,
} from 'react-icons/fi';

import DeModal from './DeModal';
import EditDepartmentModal from './EdModal';
import SearchInput from './SearchInput';
import { useDepartments } from '@/Hooks/useDepartments';
import toast from 'react-hot-toast';
import ConfirmModal from '@/app/(Employee)/Confirm';
import { useRouter } from 'next/navigation';

export default function DepartmentsPage() {
  const router = useRouter();
  const {
    updateDepartment,
    departments,
    isLoading,
    isError,
    deleteDepartment,
  } = useDepartments();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState(null);

  const dropdownRef = useRef(null);

  const filteredDepartments = useMemo(() => {
    if (!departments) return [];
    return departments.filter((dep) =>
      dep.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [departments, searchTerm]);

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleUpdateDepartment = async (updatedDepartment) => {
    try {
      await updateDepartment.mutateAsync(updatedDepartment);
      toast.success('Department updated successfully!');
    } catch (error) {
      console.error('Error updating department:', error);
      toast.error('Failed to update department.');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDepartment.mutateAsync(departmentToDelete);
      toast.success('Department deleted successfully!');
    } catch (error) {
      console.error('Error deleting department:', error);
      toast.error('Failed to delete department.');
    } finally {
      setShowConfirm(false);
      setDepartmentToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <span className="loader" />
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-white px-4 py-8 md:ml-[280px]">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Department Management</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#B79031] text-white rounded-md hover:bg-[#a07f2d] transition"
        >
          <FiPlus /> Add Department
        </button>
      </div>

      <SearchInput
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onSearch={() => {}}
        placeholder="Search departments..."
        className="mb-6"
      />

      <div className="w-full overflow-x-auto rounded-lg shadow-sm bg-white">
        <table className="w-full sm:min-w-[1000px] divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['ID', 'Name', 'Head Department', 'Email', 'Role', 'Description', 'Actions'].map((header) => (
                <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDepartments.map((dep) => (
              <tr
                key={dep.id}
                onClick={() => router.push(`/departments/${dep.id}`)}
                className="hover:bg-gray-50 cursor-pointer relative"
              >
                <td className="px-6 py-4 text-sm text-gray-700">{dep.id}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{dep.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{dep.user_id?.name || '-'}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{dep.user_id?.email || '-'}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{dep.user_id?.role || '-'}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {dep.description?.length > 50
                    ? `${dep.description.slice(0, 30)}...`
                    : dep.description}
                </td>
                <td
                  className="px-6 py-4 text-sm relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => toggleDropdown(dep.id)}
                    className="p-1.5 text-gray-600 hover:bg-gray-100 rounded"
                  >
                    <FiMoreVertical />
                  </button>

                  {openDropdownId === dep.id && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-3 -bottom-3 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50"
                    >
                      <button
                        onClick={() => {
                          setSelectedDepartment(dep);
                          setShowEditModal(true);
                          setOpenDropdownId(null);
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FiEdit2 /> Edit
                      </button>
                      <button
                        onClick={() => {
                          setDepartmentToDelete(dep.id);
                          setShowConfirm(true);
                          setOpenDropdownId(null);
                        }}
                        disabled={deleteDepartment.isLoading}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                      >
                        {deleteDepartment.isLoading ? (
                          <span className="loader small" />
                        ) : (
                          <>
                            <FiTrash2 /> Delete
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && <DeModal onClose={() => setShowAddModal(false)} />}
      {showEditModal && (
        <EditDepartmentModal
          department={selectedDepartment}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleUpdateDepartment}
        />
      )}

      <ConfirmModal
        show={showConfirm}
        message="Are you sure you want to delete this department?"
        onCancel={() => {
          setShowConfirm(false);
          setDepartmentToDelete(null);
        }}
        onConfirm={handleDelete}
      />
    </section>
  );
}

