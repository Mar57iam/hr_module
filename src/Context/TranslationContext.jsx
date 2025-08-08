'use client';

import { CustomStorage } from '@/utils/customStorage';
import { createContext, useEffect, useState } from 'react';

export const TranslationContext = createContext();
const NAMESPACES = ['auth', 'employees', 'departments', 'sidebar'];

export default function TranslationContextProvider({ children }) {
  const [lang, setLang] = useState(CustomStorage.get("lang", "en"));
  const [langDict, setLangDict] = useState({});

  async function changeLang(newLang, page = null) {
    console.log(lang)
    console.log(newLang)
    setLang(newLang);
    CustomStorage.set('lang', newLang);

    if (page) {
      await loadLanguageFile(newLang, page);
    }
    else {
      await Promise.all(NAMESPACES.map(ns => loadLanguageFile(newLang, ns)));
    }
  }

  async function loadLanguageFile(lang, page) {
    try {
      const path = `/locales/${lang}/${page}.json`;
      const res = await fetch(path);
      const data = await res.json();

      setLangDict(prev => ({
        ...prev,
        [lang]: {
          ...(prev[lang] || {}),
          [page]: data
        }
      }));
    } catch (err) {
      console.error("Failed to load language file:", err);
    }
  }

  function t(page, key) {
    return langDict?.[lang]?.[page]?.[key] || key;
  }

  useEffect(() => {
    const stored = CustomStorage.get("lang", "en");
    if (stored) setLang(stored);
  }, []);


  const [rtl, setRtl] = useState(lang == 'ar')
  useEffect(() => {
    setRtl(p => lang == 'ar')
  }, [lang])

  return (
    <TranslationContext.Provider value={{ lang, changeLang, t }}>
      {/* <div className={`${rtl ? 'md:mr-[300px]' : 'md:ml-[300px]'}`}> */}
        {children}
      {/* </div> */}
    </TranslationContext.Provider>
  );
}
