'use client';

import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

export default function Tbutton() {
  // const { i18n } = useTranslation();

  

  return (
    <div className="flex gap-4">
  <button
    onClick={() => {
      const nextLang = i18n.language === 'en' ? 'ar' : 'en';
      i18n.changeLanguage(nextLang);
      Cookies.set('i18nextLng', nextLang)
    }}
    className="px-4 py-2 rounded-md border border-gray-400 bg-white text-gray-800 hover:bg-[#B79031] hover:text-white transition-colors duration-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-[#B79031]"
  >
    {i18n.language === 'en' ? 'AR' : 'EN'}
  </button>
</div>

  );
}
