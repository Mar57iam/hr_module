'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext, useEffect, useMemo, useState } from 'react';
// import { useTranslation } from 'react-i18next';
import {
  MdDashboard, MdPersonAdd, MdPeople, MdAccessTime, MdAttachMoney,
  MdBarChart, MdSettings, MdLogout, MdList,
  MdGroup, MdBusiness, MdPlaylistAdd,
  MdFileUpload, MdPerson, MdEvent,
} from 'react-icons/md';
import { AuthContext } from '@/Context/AuthContext';
import Tbutton from '../Tbutton/Tbutton';
import useTranslation from '@/Hooks/useTranslation';

export default function Sidebar() {
  const { token, logoutUserFunc } = useContext(AuthContext);
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  const { t, lang } = useTranslation('sidebar');
  // const { t, i18n } = useTranslation('sidebar');
  
  const [isRTL, setRTL] = useState(lang === 'ar');
  useEffect(() => { setRTL(lang === 'ar') }, [lang])
  
  const sections = [
    {
      type: 'link', key: 'dashboard', href: '/dashboard', icon: <MdDashboard />,
    },
    {
      type: 'section', key: 'employees', icon: <MdPeople />, children: [
        { key: 'employee_list', href: '/employees', icon: <MdGroup /> },
        { key: 'register_employee', href: '/addEm', icon: <MdPersonAdd /> },
      ]
    },
    {
      type: 'section', key: 'documents', icon: <MdFileUpload />, children: [
        { key: 'documents_list', href: '/allDocuments', icon: <MdList /> },
        { key: 'add_document', href: '/documents/new', icon: <MdFileUpload /> }
      ]
    },
    {
      type: 'section', key: 'organization', icon: <MdBusiness />, children: [
        { key: 'departments', href: '/departments', icon: <MdBusiness /> },
        { key: 'positions', href: '/positions', icon: <MdPlaylistAdd /> },
      ]
    },
    {
      type: 'section', key: 'users_management', icon: <MdPerson />, children: [
        { key: 'users_list', href: '/users', icon: <MdGroup /> },
        { key: 'add_user', href: '/addUser', icon: <MdPersonAdd /> },
      ]
    },
    {
      type: 'section', key: 'attendance', icon: <MdAccessTime />, children: [
        { key: 'Clock', href: '/attendanceClock', icon: <MdAccessTime /> },
        // { key: 'Manual Attendance', href: '/manualAttendance', icon: <MdPerson /> },
        { key: 'reports', href: '/attendanceReports', icon: <MdBarChart /> },
      ]
    },
    {
      type: 'section', key: 'leave_management', icon: <MdEvent />, children: [
        { key: 'request_leave', href: '/leaveRequest', icon: <MdFileUpload /> },
        { key: 'pending_requests', href: '/pendingLeaves', icon: <MdList /> },
        { key: 'leave_calendar', href: '/leaveCalendar', icon: <MdAccessTime /> },
        { key: 'leave_balances', href: '/leaveBalances', icon: <MdAttachMoney /> },
        { key: 'my_profile', href: '/myProfile', icon: <MdPerson /> },
      ]
    }
  ].map(section => ({
    ...section,
    label: t(section.key),
    children: section.children?.map(child => ({
      ...child,
      label: t(child.key)
    }))
  }))
  
  console.log("token")
  console.log(token)
  if (!token) return <></>

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`sm:hidden fixed top-4 ${isRTL ? 'right-4' : 'left-4'} z-50 p-2 bg-gray-200 rounded-md dark:bg-gray-700`}
      >
        <svg className="w-6 h-6 text-gray-800 dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 ${isRTL ? 'right-0' : 'left-0'} w-[280px] h-screen bg-white dark:bg-gray-800 shadow-xl rounded-xl flex flex-col justify-between px-3 py-4 overflow-y-auto transform transition-transform duration-200 ${isOpen ? 'translate-x-0' : isRTL ? 'translate-x-full' : '-translate-x-full'} sm:translate-x-0`}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="h-full flex flex-col justify-between">
          {/* Logo */}
          <div className="flex mt-10 flex-col items-center">
            <img
              src="/images/logo2.svg"
              alt="Logo"
              width={140}
              height={140}
              className="mb-4"
              loading="lazy"
            />
          </div>

          {/* Links */}
          <div className="flex-1 flex flex-col justify-start overflow-y-auto">
            <ul className="space-y-2">
              {sections.map(section => {
                const isActive = pathname.startsWith(section.href || '');

                if (section.type === 'link') {
                  return (
                    <li key={section.key}>
                      <Link
                        href={section.href}
                        className={`flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'} gap-3 px-4 py-2 rounded-lg transition-colors text-base ${isActive ? 'bg-[#B79031] text-white dark:bg-gray-700' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`}
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="text-2xl">{section.icon}</span>
                        <span>{section.label}</span>
                      </Link>
                    </li>
                  );
                }

                if (section.type === 'section') {
                  return (
                    <li key={section.key}>
                      <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'} gap-3 px-4 py-2 text-gray-500 uppercase tracking-wide text-xs dark:text-gray-400`}>
                        <span className="text-lg">{section.icon}</span>
                        <span>{section.label}</span>
                      </div>
                      <ul className="ml-8 mt-1 space-y-1">
                        {section.children.map(sub => (
                          <li key={sub.key}>
                            <Link
                              href={sub.href}
                              className={`flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'} gap-2 px-4 py-2 rounded-md transition-colors text-sm ${pathname.startsWith(sub.href) ? 'bg-[#B79031] text-white dark:bg-gray-700' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'}`}
                            >
                              <span className="text-base">{sub.icon}</span>
                              <span>{sub.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                }

                return null;
              })}
            </ul>
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-3 px-4 mb-4">
            <hr className="w-[80%] border-t border-gray-200 dark:border-gray-600 self-center" />
            <button onClick={logoutUserFunc} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-red-500">
              <MdLogout className="text-xl" />
              {t('logout')}
            </button>
            <Tbutton />
          </div>
        </div>
      </aside>
    </>
  );
}
