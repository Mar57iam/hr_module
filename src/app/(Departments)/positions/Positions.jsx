'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FiPlus, FiMoreVertical, FiEdit2, FiTrash2 } from 'react-icons/fi';
import Modal from './Modal/Modal'; // دا للـ Add
// import EditPositionModal from './Modal/EditPositionModal'; // دا للـ Edit
import { usePositions } from '@/Hooks/usePositions';
import toast from 'react-hot-toast';
import EditPositionModal from './EditModal';

export default function PositionsPage() {
  const { positions, isLoading, addPosition, updatePosition } = usePositions();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [positionToEdit, setPositionToEdit] = useState(null);

  const [openDropdownId, setOpenDropdownId] = useState(null);
  const dropdownRefs = useRef({});

  const toggleDropdown = (id) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        openDropdownId !== null &&
        dropdownRefs.current[openDropdownId] &&
        !dropdownRefs.current[openDropdownId].contains(e.target)
      ) {
        setOpenDropdownId(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdownId]);

  const handleAddPosition = (newPosition) => {
    addPosition.mutate(newPosition, {
      onSuccess: () => {
        toast.success('Position added successfully!');
        setIsAddModalOpen(false);
      },
      onError: () => {
        toast.error('Failed to add position!');
      },
    });
  };

  const handleEdit = (position) => {
    setPositionToEdit(position);
    setIsEditModalOpen(true);
  };

  const handleUpdatePosition = (updatedPosition) => {
    updatePosition.mutate(updatedPosition, {
      onSuccess: () => {
        toast.success('Position updated successfully!');
        setIsEditModalOpen(false);
      },
      onError: () => {
        toast.error('Failed to update position!');
      },
    });
  };

  const handleDelete = (idx) => {
    toast(`Delete Position #${idx}`);
    // كود الحذف هنا
  };

  return (
    <section className="min-h-screen bg-white px-4 py-8 md:ml-[280px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-700">Position Management</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#B79031] text-white rounded-md hover:bg-[#a07f2d]"
        >
          <FiPlus /> Add Position
        </button>
      </div>

      <div className="w-full overflow-x-auto rounded-lg shadow-sm bg-white">
        <table className="w-full sm:min-w-[600px] divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Salary</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              positions?.map((position, idx) => (
                <tr key={idx} className="hover:bg-gray-50 relative">
                  <td className="px-6 py-4">{position.title}</td>
                  <td className="px-6 py-4">{position.department_id?.name}</td>
                  <td className="px-6 py-4">{position.salary_range} EGP</td>
                  <td className="px-6 py-4 relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(idx);
                      }}
                      className="p-1.5 rounded hover:bg-gray-100"
                    >
                      <FiMoreVertical />
                    </button>

                    {openDropdownId === idx && (
                      <div
                        ref={(el) => (dropdownRefs.current[idx] = el)}
                        className="absolute right-4 mt-2 w-40 bg-white border border-gray-200 rounded shadow z-50"
                      >
                        <button
                          onClick={() => handleEdit(position)}
                          className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <FiEdit2 className="mr-2" /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(idx)}
                          className="flex w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          <FiTrash2 className="mr-2" /> Delete
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

      {isAddModalOpen && (
        <Modal onClose={() => setIsAddModalOpen(false)} onSave={handleAddPosition} />
      )}

      {isEditModalOpen && (
        <EditPositionModal
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleUpdatePosition}
          initialData={positionToEdit}
        />
      )}
    </section>
  );
}



