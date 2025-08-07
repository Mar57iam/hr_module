'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import useEmployees from '@/Hooks/useEmployees';
import Protected from '@/app/_Components/ProutectedRoute/Protected';

const employeeSchema = z.object({
  first_name: z.string().min(3, 'validation.first_name_min'),
  last_name: z.string().min(3, 'validation.last_name_min'),
  phone_number: z.string().regex(/^01[0-2,5]{1}[0-9]{8}$/, 'validation.phone_invalid'),
  address: z.string().min(5, 'validation.address_min'),
  hire_date: z.string().nonempty('validation.hire_date_required'),
  status: z.enum(['active', 'inactive'], { required_error: 'validation.status_required' }),
  department_id: z.coerce.number().min(1, 'validation.department_id_required'),
  position_id: z.coerce.number().min(1, 'validation.position_id_required'),
  employee_id: z.coerce.number().min(1, 'validation.employee_id_required'),
  user_id: z.coerce.number().min(1, 'validation.user_id_required'),
  salary: z.coerce.number().min(1, 'validation.salary_required'),
});

const fields = [
  { name: 'first_name', type: 'text' },
  { name: 'last_name', type: 'text' },
  { name: 'phone_number', type: 'tel' },
  { name: 'address', type: 'text' },
  { name: 'hire_date', type: 'date' },
  { name: 'status', type: 'select', options: ['active', 'inactive'] },
  { name: 'department_id', type: 'number' },
  { name: 'position_id', type: 'number' },
  { name: 'employee_id', type: 'number' },
  { name: 'user_id', type: 'number' },
  { name: 'salary', type: 'number' },
];

function FormField({ name, type, register, errors, apiErrors, t, options }) {
  const error = errors[name]?.message;
  const apiError = apiErrors?.[name]?.[0];
  const fieldLabel = t(name);
  const placeholder = t(`placeholders.${name}`);

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900">{fieldLabel}</label>

      {type === 'select' ? (
        <select
          {...register(name)}
          className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
        >
          <option value="">{t('select_status')}</option>
          {options.map(opt => (
            <option key={opt} value={opt}>{t(`status_${opt}`)}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          {...register(name)}
          placeholder={placeholder}
          className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
        />
      )}

      {(error || apiError) && (
        <p className="text-red-500 text-xs mt-1">{error ? t(error) : apiError}</p>
      )}
    </div>
  );
}

export default function RegisterEmployee() {
  // const { t, i18n } = useTranslation('employees');
  const isRTL = i18n.language === 'ar';

  const { addMutation } = useEmployees();
  const [apiErrors, setApiErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(employeeSchema),
  });

  const onSubmit = useCallback((data) => {
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
          if (res.errors) setApiErrors(res.errors);
          else if (res.message) toast.error(res.message);
        } else {
          console.error(error);
        }

        setLoading(false);
      },
    });
  }, [addMutation, reset, t]);

  const directionClass = useMemo(() => (isRTL ? 'rtl md:mr-[280px]' : 'ltr md:ml-[280px]'), [isRTL]);

  return (
    <Protected>
      <section dir={isRTL ? 'rtl' : 'ltr'} className={`min-h-screen flex flex-col px-4 pt-10 ${directionClass}`}>
        <div className={`${isRTL ? 'md:mr-48' : 'md:ml-48'} md:mb-12`}>
          <h2 className="text-3xl font-bold text-gray-700">{t('register_employee')}</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col rounded-xl bg-white shadow-md w-full max-w-5xl mx-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            {fields.map(field => (
              <FormField
                key={field.name}
                {...field}
                register={register}
                errors={errors}
                apiErrors={apiErrors}
                t={t}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-[50%] mx-auto mb-3 mt-5 flex justify-center items-center gap-2 font-medium rounded-lg text-sm px-5 py-2.5 transition-all ${
              loading
                ? 'opacity-50 cursor-not-allowed bg-[#B79031]'
                : 'text-white bg-[#B79031] hover:bg-white hover:text-black border border-transparent hover:border-gray-600'
            }`}
          >
            {loading ? t('loading') : t('add_employee')}
          </button>
        </form>
      </section>
    </Protected>
  );
}







