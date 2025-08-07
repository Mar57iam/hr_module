'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const TranslationContext = createContext();
const NAMESPACES = ['auth', 'employees', 'departments', 'sidebar'];

export default function TranslationProvider({ children }) {
  const [lang, setLang] = useState('en');
  const [langDict, setLangDict] = useState({});

  async function changeLang(newLang, page = null) {
    setLang(newLang);
    localStorage.setItem('lang', newLang);

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
    const stored = localStorage.getItem("lang");
    if (stored) setLang(stored);
  }, []);

  return (
    <TranslationContext.Provider value={{ lang, changeLang, t }}>
      {children}
    </TranslationContext.Provider>
  );
}
