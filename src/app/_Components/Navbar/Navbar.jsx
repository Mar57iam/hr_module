'use client';

import React, { useContext } from 'react';
import { AuthContext } from '@/Context/AuthContext';
import { FaBell } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import { CustomStorage } from '@/utils/customStorage';
import useTranslation from '@/Hooks/useTranslation';

export default function Navbar() {
  const { logoutUserFunc } = useContext(AuthContext);
  const { t, lang, setLang } = useTranslation('sidebar');

  return (
    <nav className="w-full flex justify-end items-center p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
  <div className="flex items-center gap-4">
    <button
      onClick={logoutUserFunc}
      className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
    >
      <MdLogout className="text-xl" />
      {t('logout')}
    </button>

    <button
      onClick={() => {
        const nextLang = lang === 'en' ? 'ar' : 'en';
        setLang(nextLang);
      }}
      className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-yellow-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
    >
      {i18n.language === 'en' ? 'AR' : 'EN'}
    </button>
  </div>
</nav>

  
  
  
  );
}
