'use client';

import { IoMdSearch, IoMdCloudUpload, IoMdDownload } from "react-icons/io";
import Link from "next/link";
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function EmployeeFilter() {
  // const { t, i18n } = useTranslation('employees'); 

  const handleImport = () => {
    alert(t("import_clicked"));
  };

  const handleExport = () => {
    alert(t("export_clicked"));
  };

  const isRTL = i18n.language === 'ar';

  return (
    <div className={`bg-white mt-3.5 flex flex-col justify-center w-full max-w-[99%]  mb-6 p-4 ${isRTL ? 'text-right' : 'text-left'}`}>
     

      
      <div className={`relative flex flex-col md:flex-row md:items-center gap-2 ${isRTL ? 'mr-2' : 'ml-2'} mt-2 w-full`}>
        <div className="relative flex-grow flex">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-l-lg bg-white focus:outline-none"
            placeholder={t('search_placeholder')}
            required
          />
          <button
            className="
              flex items-center gap-2
              px-5 py-3.5
              rounded-r-lg border border-l-0 border-gray-300
              bg-[#B79031] text-white text-[16px]
              hover:bg-[#a07f2d]
              transition-colors duration-300
            "
          >
            {t('search')}
            <IoMdSearch />
          </button>
        </div>
      </div>

      
      <div className={`flex flex-col md:flex-row flex-wrap items-center gap-3 mt-4 ${isRTL ? 'mr-2' : 'ml-2'}`}>
        <select className="w-full md:w-52 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none">
          <option>{t('status_all')}</option>
          <option>{t('status_active')}</option>
          <option>{t('status_inactive')}</option>
        </select>

        <select className="w-full md:w-52 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none">
          <option>{t('department_all')}</option>
          <option>{t('department_hr')}</option>
          <option>{t('department_engineering')}</option>
        </select>

        <select className="w-full md:w-52 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none">
          <option>{t('position_all')}</option>
          <option>{t('position_manager')}</option>
          <option>{t('position_developer')}</option>
        </select>

        <button className="px-4 py-2 ml-0 md:ml-1.5 rounded-lg bg-[#B79031] text-white hover:bg-[#b79039] text-sm w-full md:w-auto">
          {t('reset_filters')}
        </button>

        <div className="flex flex-col md:flex-row gap-2">
       

          <button
            onClick={handleImport}
            className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-200 bg-white text-gray-800 hover:bg-[#B79031] hover:text-white transition-colors duration-300 w-full md:w-auto"
          >
            <IoMdCloudUpload className="text-lg" />
            {t('import')}
          </button>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-200 bg-white text-gray-800 hover:bg-[#B79031] hover:text-white transition-colors duration-300 w-full md:w-auto"
          >
            <IoMdDownload className="text-lg" />
            {t('export')}
          </button>


          <Link
            href="/addEm"
            className="px-4 py-2 rounded-md border bg-[#B79031] border-gray-200  text-white hover:bg-[#B79031] hover:text-white transition-colors duration-300 w-full md:w-auto text-center"
          >
            {t('add_employee')}
          </Link>
        </div>
      </div>
    </div>
  );
}
