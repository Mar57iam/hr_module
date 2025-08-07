import { useEffect, useState } from 'react';


export default function useTranslation(page) {
    const [lang, setLang] = useState('en');
    const [langDict, setLangDict] = useState(null);

    useEffect(() => {
        setLang(localStorage.getItem("lang") || "en")
    }, [])
    useEffect(() => {
        console.log("change language")
        localStorage.setItem("lang", lang)
    }, [lang])

    useEffect(() => {
        // async function loadLang() {
        //     const LOAD_PATH = '/locales/{{lng}}/{{ns}}.json';
        //     const load_path = LOAD_PATH.replace("{{lng}}", lang).replace("{{ns}}", page)
        //     await fetch(load_path)
        //         .then((res) => res.json())
        //         .then((res) => setLangDict(res)
        //         )
        // }
        // localStorage.setItem("lang", lang)
        // loadLang()
    }, [page, lang])

    useEffect(() => {
        console.log("langDict")
        console.log(langDict)
    }, [langDict])

    function t(word) {
        // const dict = langDict[lang]
        if (langDict) return langDict[word]
        return word
    }
    return { lang, setLang, t };
}
