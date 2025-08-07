import { useEffect, useState } from 'react';

const LOAD_PATH = '/locales/{{lng}}/{{ns}}.json';

export default function useTranslation(page) {
    const [ lang, setLang ] = useState('en');
    const [ langDict, setLangDict ] = useState({});

    // useEffect(() => {
    //     setLang(localStorage.getItem("lang") || "en")
    // }, [])

    // useEffect(() => {
    //     function loadLang(lang) {
    //         const load_path = LOAD_PATH.replace("{{lng}}", lang).replace("{{ns}}", page)
    //         fetch(load_path)
    //             .then((res) => res.json())
    //             .then((res) =>
    //                 setLangDict({ ...langDict, lang: loadLang(lang) })
    //             )
    //     }
    //     localStorage.setItem("lang", lang)
    //     loadLang(lang)
    // }, [])
    
    
    function t(word) {
        const dict = langDict[lang]
        if (dict) return dict[word]
        return word
    }
    return { lang, setLang, t };
}
