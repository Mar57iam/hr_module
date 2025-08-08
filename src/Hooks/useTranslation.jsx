'use client';

import { TranslationContext } from '@/Context/TranslationContext.jsx';
import { createContext, useContext, useEffect, useState } from 'react';

export default function useTranslation(page = null) {
  const { lang, changeLang, t } = useContext(TranslationContext);

  useEffect(() => {
    if (page) {
      changeLang(lang, page);
    }
  }, [page]);

  return {
    lang,
    setLang: (newLang) => changeLang(newLang, page),
    t: (key) => t(page, key),
  };
}



// export default function useTranslation(page = null) {
//     const [lang, setLang] = useState('en');
//     // const [langDict, setLangDict] = useState(JSON.parse(CustomStorage.get("langDict")));
//     const [langDict, setLangDict] = useState({});

//     // Check if data for this lang+page is already loaded
//     function isCachedData(lang, page) {
//         if (!page) return false
//         return !!langDict?.[lang]?.[page];
//     }


//     async function loadNamespace(newLang, page) {
//         try {
//             const path = `/locales/${newLang}/${page}.json`;
//             await fetch(path)
//                 .then(res => res.json())
//                 .then(
//                     (data) => {
//                         // Merge new data into existing langDict
//                         setLangDict(prev => ({
//                             ...prev,
//                             [newLang]: {
//                                 ...prev?.[newLang],
//                                 [page]: data
//                             }
//                         }));
//                         setLang(newLang);
//                         CustomStorage.set("lang", newLang);
//                     }
//                 );
//         } catch (err) {
//             console.error("Failed to load translation:", err);
//         }
//     }
//     async function changeLang(newLang) {
//         if (isCachedData(newLang, page)) {
//             setLang(newLang);
//             CustomStorage.set("lang", newLang);
//         } else {
//             if (page) {
//                 // Load single namespace
//                 await loadNamespace(newLang, page);
//             } else {
//                 // Load all known namespaces
//                 await Promise.all(NAMESPACES.map(ns => loadNamespace(newLang, ns)));
//             }
//         }
//     }

//     useEffect(() => {
//         const storedLang = CustomStorage.get("lang", "en");
//         changeLang(storedLang);
//     }, [page, lang]); // runs when `page` changes


//     function t(key) {
//         console.log(langDict?.[lang]?.[page]?.[key] || key)
        
//         // Access via: langDict[lang][page][key]
//         return langDict?.[lang]?.[page]?.[key] || key;
//     }

//     return { lang, setLang: changeLang, t };
// }
