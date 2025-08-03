'use client';

import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { AuthContext } from '@/Context/AuthContext';

export default function ResetPassword() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const { t, i18n } = useTranslation('auth');
  const isRTL = i18n.language === 'ar';

  const { resetPasswordFunc } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      await resetPasswordFunc({
        password: data.password,
        token: token,
        email: email  
      });
      toast.success('Password reset successful!');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`flex flex-col justify-center h-full ${isRTL ? 'text-right' : 'text-left'}`}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="flex items-center justify-center w-[100px] h-[100px] rounded-full bg-gray-50 dark:bg-gray-600">
              <Image
                src="/images/logo2.svg"
                alt="Logo"
                width={100}
                height={100}
              />
            </div>

            <h5 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#B79031] to-[#69531E] text-center">
              {t('reset_password_title')}
            </h5>

            <p className="text-center text-gray-600 dark:text-gray-300 text-sm max-w-sm">
              {t('reset_password_instruction')}
            </p>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {t('password')}
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
              placeholder={t('password_placeholder')}
              autoComplete="off"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mb-2 outline-none block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {t('confirm_password')}
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              placeholder={t('confirm_password_placeholder')}
              autoComplete="off"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mb-2 outline-none block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer mb-3 mt-5 text-white flex items-center justify-center gap-2 bg-[#B79031] hover:bg-white hover:text-black hover:border border-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-600 dark:hover:text-white dark:hover:bg-gray-900 group"
          >
            {t('reset_password_btn')}
          </button>
        </form>
      </div>
    </div>
  );
}
