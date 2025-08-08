'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
// import { useTranslation } from 'react-i18next';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthContext } from '@/Context/AuthContext';
import { CgSpinner } from "react-icons/cg";
import useTranslation from '@/Hooks/useTranslation';
import Loader, { Spinner } from '@/app/_Components/Loader/loader';

export default function LoginForm() {
  const { loginUserFunc } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState('');


  const schema = z.object({
    email: z.string().email("Email must be valid"),
    password: z.string()
      .min(6, "Password must be at least 6 characters")
      .regex(/^[A-Za-z0-9]+$/, "Password must contains only letters and numbers")
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "all",
    resolver: zodResolver(schema)
  });

  // const { t, i18n } = useTranslation('auth');
  const { lang, setLang, t } = useTranslation("auth")
  const [isRTL, setRTL] = useState(false);


  useEffect(() => {
    setRTL(lang === 'ar')
  }, [lang])


  const loginFn = async (values) => {
    try {
      setIsLoading(true);
      setApiErrorMessage('');

      await loginUserFunc(values);

    } catch (error) {
      console.error(error);
      const serverMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
      setApiErrorMessage(serverMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return <>
    {
      isLoading ? <Loader /> :
        <>
          <div className="flex justify-center items-center h-screen bg-gray-50  bg-cover bg-center bg-no-repeat dark:bg-gray-900" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="w-full h-[600px] max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <form onSubmit={handleSubmit(loginFn)} className="flex flex-col justify-center h-full">
                <div className="flex flex-col items-center gap-4 mb-8">
                  <div className="flex items-center justify-center w-[100px] h-[100px] rounded-full bg-gray-50 dark:bg-gray-600">
                    <Image src="/images/logo2.svg" alt="Logo" width={100} height={100} />
                  </div>
                  <h5 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#B79031] to-[#69531E] text-center">
                    {t('signin')}
                  </h5>
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block mb-2 text-sm font-medium  text-gray-900 dark:text-white">
                    {t('email')}
                  </label>
                  <input type="email" id="email" {...register("email")}
                    placeholder={t('email_placeholder')} autoComplete="off" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:outline-none"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div className="mb-2">
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {t('password')}
                  </label>
                  <input
                    type="password" id="password" {...register("password")} placeholder={t('password_placeholder')}
                    autoComplete="off" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mb-2 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:outline-none"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                  )}

                  {apiErrorMessage && (
                    <p className="text-red-100 p-2 rounded-md text-center bg-red-600 text-[12px] mt-1">{apiErrorMessage}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full cursor-pointer mb-3 mt-5 text-white flex items-center justify-center gap-2 bg-[#B79031] hover:bg-white hover:text-black hover:border border-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-600 dark:hover:text-white dark:hover:bg-gray-900 group disabled:opacity-50"
                >
                  {isLoading ? (
                    <Spinner />
                  ) :
                    t('signin_btn')
                  }
                </button>

                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  <Link href="/forgetPassword">
                    {t('forget')}
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </>
    }
  </>
}
