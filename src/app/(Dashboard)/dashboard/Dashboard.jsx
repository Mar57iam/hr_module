// app/dashboard/page.jsx
'use client';

import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/Context/AuthContext';


import AdmainDashboard from './AdmainDashboard';
import EmDashboard from './EmDashboard';

export default function DashboardPage() {
  const router = useRouter();
  const { getMeFunc } = useContext(AuthContext);
  const [role, setRole] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getMeFunc();
        if (user?.user?.role) {
          setRole(user.user.role);
        } else {
          router.push('/');
        }
      } catch (error) {
        router.push('/');
      }
    }
  
    fetchUser();
  }, []);
  

  if (!role) return <p>Loading...</p>;

  if (role === 'admin' || role === 'manager') {
    return <AdmainDashboard />;
  }

  if (role === 'employee') {
    return <EmDashboard />;
  }

  return null;
}
