"use client";
import useTranslation from '@/Hooks/useTranslation';
import React from 'react';
import { CgSpinner } from 'react-icons/cg';

export default function Loader() {
    const { t } = useTranslation()
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <span className="loader" />
            <p className="font-bold mt-4">{t('loading')}...</p>
        </div>
    );
}
export function Spinner() {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <CgSpinner className="animate-spin w-5 h-5" />
        </div>
    );
}