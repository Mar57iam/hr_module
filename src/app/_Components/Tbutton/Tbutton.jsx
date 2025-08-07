'use client';

import useTranslation from '@/Hooks/useTranslation';
// import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

export default function Tbutton() {
  const { lang, setLang } = useTranslation();
  // const { i18n } = useTranslation();

  useEffect(() => {

  }, [lang])

  return (
    <div className="flex gap-4">
      <button
        onClick={() => {
          const nextLang = lang === 'en' ? 'ar' : 'en';
          setLang(nextLang);
        }}
        className="px-4 py-2 rounded-md border border-gray-400 bg-white text-gray-800 hover:bg-[#B79031] hover:text-white transition-colors duration-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-[#B79031]"
      >
        {lang === 'en' ? 'AR' : 'EN'}
      </button>
    </div>

  );
}
