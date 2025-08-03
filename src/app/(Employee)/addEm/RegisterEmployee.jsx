'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import useEmployees from '@/Hooks/useEmployees';
import toast, { Toaster } from 'react-hot-toast';
import Protected from '@/app/_Components/ProutectedRoute/Protected';
import { useTranslation } from 'react-i18next';

const employeeSchema = z.object({
  first_name: z.string().min(3, 'validation.first_name_min'),
  last_name: z.string().min(3, 'validation.last_name_min'),
  phone_number: z
    .string()
    .regex(/^01[0-2,5]{1}[0-9]{8}$/, 'validation.phone_invalid'),
  address: z.string().min(5, 'validation.address_min'),
  hire_date: z.string().nonempty('validation.hire_date_required'),
  status: z.enum(['active', 'inactive'], {
    required_error: 'validation.status_required',
  }),
  department_id: z.coerce.number().min(1, 'validation.department_id_required'),
  position_id: z.coerce.number().min(1, 'validation.position_id_required'),
  employee_id: z.coerce.number().min(1, 'validation.employee_id_required'),
  user_id: z.coerce.number().min(1, 'validation.user_id_required'),
  salary: z.coerce.number().min(1, 'validation.salary_required'),
});

export default function RegisterEmployee() {
  const { t, i18n } = useTranslation('employees');
  const isRTL = i18n.language === 'ar';

  const { addMutation } = useEmployees();
  const [apiErrors, setApiErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(employeeSchema),
  });

  const onSubmit = (data) => {
    setApiErrors({});
    setLoading(true);

    addMutation.mutate(data, {
      onSuccess: () => {
        toast.success(t('success_add'), { duration: 3000 });
        reset();
        setLoading(false);
      },
      onError: async (error) => {
        toast.error(t('error_general'), { duration: 3000 });

        if (error instanceof Response) {
          const res = await error.json();
          if (res.errors) {
            setApiErrors(res.errors);
          } else if (res.message) {
            toast.error(res.message);
          }
        } else {
          console.error(error);
        }
        setLoading(false);
      },
    });
  };

  return (
    <Protected>
      <section
        dir={isRTL ? 'rtl' : 'ltr'}
        className={`min-h-screen flex flex-col px-4 pt-10 ${
          isRTL ? 'md:mr-[280px]' : 'md:ml-[280px]'
        }`}
      >
        

        <div className={`${isRTL ? 'md:mr-48' : 'md:ml-48'} md:mb-12`}>
          <h2 className="text-3xl font-bold text-gray-700">
            {t('register_employee')}
          </h2>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col rounded-xl bg-white shadow-md w-full max-w-5xl mx-auto p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            {/* First Name */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                {t('first_name')}
              </label>
              <input
                type="text"
                {...register('first_name')}
                placeholder={t('placeholders.first_name')}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5"
              />
              {errors.first_name && (
                <p className="text-red-500 text-xs mt-1">
                  {t(errors.first_name.message)}
                </p>
              )}
              {apiErrors.first_name && (
                <p className="text-red-500 text-xs mt-1">
                  {apiErrors.first_name[0]}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                {t('last_name')}
              </label>
              <input
                type="text"
                {...register('last_name')}
                placeholder={t('placeholders.last_name')}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5"
              />
              {errors.last_name && (
                <p className="text-red-500 text-xs mt-1">
                  {t(errors.last_name.message)}
                </p>
              )}
              {apiErrors.last_name && (
                <p className="text-red-500 text-xs mt-1">
                  {apiErrors.last_name[0]}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                {t('phone_number')}
              </label>
              <input
                type="tel"
                {...register('phone_number')}
                placeholder={t('placeholders.phone_number')}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5"
              />
              {errors.phone_number && (
                <p className="text-red-500 text-xs mt-1">
                  {t(errors.phone_number.message)}
                </p>
              )}
              {apiErrors.phone_number && (
                <p className="text-red-500 text-xs mt-1">
                  {apiErrors.phone_number[0]}
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                {t('address')}
              </label>
              <input
                type="text"
                {...register('address')}
                placeholder={t('placeholders.address')}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5"
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">
                  {t(errors.address.message)}
                </p>
              )}
              {apiErrors.address && (
                <p className="text-red-500 text-xs mt-1">
                  {apiErrors.address[0]}
                </p>
              )}
            </div>

            {/* Hire Date */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                {t('hire_date')}
              </label>
              <input
                type="date"
                {...register('hire_date')}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5"
              />
              {errors.hire_date && (
                <p className="text-red-500 text-xs mt-1">
                  {t(errors.hire_date.message)}
                </p>
              )}
              {apiErrors.hire_date && (
                <p className="text-red-500 text-xs mt-1">
                  {apiErrors.hire_date[0]}
                </p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                {t('status')}
              </label>
              <select
                {...register('status')}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5"
              >
                <option value="">{t('select_status')}</option>
                <option value="active">{t('status_active')}</option>
                <option value="inactive">{t('status_inactive')}</option>
              </select>
              {errors.status && (
                <p className="text-red-500 text-xs mt-1">
                  {t(errors.status.message)}
                </p>
              )}
              {apiErrors.status && (
                <p className="text-red-500 text-xs mt-1">
                  {apiErrors.status[0]}
                </p>
              )}
            </div>

            {/* Department ID */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                {t('department_id')}
              </label>
              <input
                type="number"
                {...register('department_id')}
                placeholder={t('placeholders.department_id')}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5"
              />
              {errors.department_id && (
                <p className="text-red-500 text-xs mt-1">
                  {t(errors.department_id.message)}
                </p>
              )}
              {apiErrors.department_id && (
                <p className="text-red-500 text-xs mt-1">
                  {apiErrors.department_id[0]}
                </p>
              )}
            </div>

            {/* Position ID */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                {t('position_id')}
              </label>
              <input
                type="number"
                {...register('position_id')}
                placeholder={t('placeholders.position_id')}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5"
              />
              {errors.position_id && (
                <p className="text-red-500 text-xs mt-1">
                  {t(errors.position_id.message)}
                </p>
              )}
              {apiErrors.position_id && (
                <p className="text-red-500 text-xs mt-1">
                  {apiErrors.position_id[0]}
                </p>
              )}
            </div>

            {/* Employee ID */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                {t('employee_id')}
              </label>
              <input
                type="number"
                {...register('employee_id')}
                placeholder={t('placeholders.employee_id')}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5"
              />
              {errors.employee_id && (
                <p className="text-red-500 text-xs mt-1">
                  {t(errors.employee_id.message)}
                </p>
              )}
              {apiErrors.employee_id && (
                <p className="text-red-500 text-xs mt-1">
                  {apiErrors.employee_id[0]}
                </p>
              )}
            </div>

            {/* User ID */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                {t('user_id')}
              </label>
              <input
                type="number"
                {...register('user_id')}
                placeholder={t('placeholders.user_id')}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5"
              />
              {errors.user_id && (
                <p className="text-red-500 text-xs mt-1">
                  {t(errors.user_id.message)}
                </p>
              )}
              {apiErrors.user_id && (
                <p className="text-red-500 text-xs mt-1">
                  {apiErrors.user_id[0]}
                </p>
              )}
            </div>

            {/* Salary */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                {t('salary')}
              </label>
              <input
                type="number"
                {...register('salary')}
                placeholder={t('placeholders.salary')}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5"
              />
              {errors.salary && (
                <p className="text-red-500 text-xs mt-1">
                  {t(errors.salary.message)}
                </p>
              )}
              {apiErrors.salary && (
                <p className="text-red-500 text-xs mt-1">
                  {apiErrors.salary[0]}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full cursor-pointer mb-3 mt-5 flex items-center justify-center gap-2 ${
              loading
                ? 'opacity-50 cursor-not-allowed bg-[#B79031]'
                : 'text-white bg-[#B79031] hover:bg-white hover:text-black hover:border border-gray-600'
            } focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5`}
          >
            {loading ? t('loading') : t('add_employee')}
          </button>
        </form>
      </section>
    </Protected>
  );
}







