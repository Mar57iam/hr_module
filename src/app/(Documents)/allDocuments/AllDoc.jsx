'use client';

import useDocuments from '@/Hooks/useDocuments';
import React, { useState } from 'react';
import { FiMoreVertical, FiPlus } from 'react-icons/fi';
import AddDocumentModal from '../DocModal';
import Loader from '@/app/_Components/Loader/loader';

import ConfirmModal from '@/app/(Employee)/Confirm';
import SearchInput from '@/app/(Departments)/departments/SearchInput';

import useTranslation from '@/Hooks/useTranslation';

export default function AllDocumentsTable() {
  const { t, lang } = useTranslation('documents');
  const isRTL = lang === 'ar';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const {
    documents,
    isLoading,
    isError,
    refetch,
    deleteDocument,
    isDeleting,
    deleteError,
  } = useDocuments();

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <span className="loader" />
      </div>
    );
  }
  if (isError)
    return (
      <p className="ml-[300px] text-red-500">{t('error.general', 'Something went wrong!')}</p>
    );

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleViewPDF = (fileUrl) => {
    window.open(fileUrl, '_blank');
  };

  const handleDelete = async (id) => {
    try {
      await deleteDocument(id);
      refetch();
      setOpenDropdownId(null);
    } catch (error) {
      console.error('Delete error:', error);
    } finally {
      setConfirmDeleteId(null);
    }
  };

  const filteredDocuments = documents?.filter((doc) => {
    const fullName = `${doc.employee_id?.first_name || ''} ${doc.employee_id?.last_name || ''}`;
    const department = doc.employee_id?.department_id?.name || '';
    return (
      doc.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="ml-[300px] p-6 overflow-x-auto">
      {deleteError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {t('error.delete', 'Error deleting document')}: {deleteError.message}
        </div>
      )}

      <div className="flex flex-col mb-6 gap-4">
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-bold text-gray-700">{t('all_documents', 'All Documents')}</h2>

          <div className="flex flex-col items-end gap-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 w-auto flex items-center bg-[#B79031] text-white rounded-md hover:bg-[#a07f2d] transition"
            >
              <FiPlus className="mr-1" /> {t('add_document', 'Add Document')}
            </button>

            <SearchInput
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onSearch={() => {}}
              placeholder={t('search_placeholder', 'Search ......')}
              className="w-full sm:w-[300px]"
            />
          </div>
        </div>
      </div>

      <div className="w-full overflow-x-auto rounded-lg shadow-sm bg-white">
        <table className="w-full sm:min-w-[1000px] divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">{t('table.id', 'ID')}</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">{t('table.title', 'Title')}</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">{t('table.employee', 'Employee')}</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">{t('table.department', 'Department')}</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600">{t('table.actions', 'Actions')}</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {filteredDocuments?.length > 0 ? (
              filteredDocuments.map((doc) => {
                const employee = doc.employee_id;
                const fullName = employee
                  ? `${employee.first_name} ${employee.last_name}`
                  : t('not_available', 'N/A');
                const department = employee?.department_id?.name || t('not_available', 'N/A');
                const fileUrl = `https://site46339-a7pcm8.scloudsite101.com/${doc.document}`;

                return (
                  <tr key={doc.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-700">{doc.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{doc.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{fullName}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{department}</td>
                    <td className="px-6 py-4 text-center relative">
                      <button
                        onClick={() => toggleDropdown(doc.id)}
                        className="p-2 rounded-full hover:bg-gray-200 transition"
                        disabled={isDeleting}
                      >
                        <FiMoreVertical className="text-gray-600" size={18} />
                      </button>

                      {openDropdownId === doc.id && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                          <button
                            onClick={() => handleViewPDF(fileUrl)}
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            {t('actions.view_pdf', 'View PDF')}
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(doc.id)}
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-500"
                            disabled={isDeleting}
                          >
                            {isDeleting && confirmDeleteId === doc.id
                              ? t('actions.deleting', 'Deleting...')
                              : t('actions.delete', 'Delete')}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-4 text-center text-gray-500"
                >
                  {t('no_data', 'No data to show')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        show={!!confirmDeleteId}
        message={t('confirm_delete_message', 'Are you sure you want to delete this document?')}
        onConfirm={() => handleDelete(confirmDeleteId)}
        onCancel={() => setConfirmDeleteId(null)}
      />

      <AddDocumentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          refetch();
        }}
      />
    </div>
  );
}


