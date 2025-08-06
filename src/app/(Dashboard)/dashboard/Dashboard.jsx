// app/dashboard/page.jsx
'use client';

import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/Context/AuthContext';


import AdmainDashboard from './AdmainDashboard';
import EmDashboard from './EmDashboard';

export default function Dashboard() {
  const router = useRouter();
  const { getMeFunc } = useContext(AuthContext);
  const [role, setRole] = useState(localStorage.getItem("user").role);



  if (role === 'admin' || role === 'manager') {
    return <AdmainDashboard />;
  }
  if (role === 'employee') {
    return <EmDashboard />;
  }

  return <p>Loading...</p>;
}

