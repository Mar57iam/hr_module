'use client';

import { AuthContext } from '@/Context/AuthContext'
import useTranslation from '@/Hooks/useTranslation';
import { CustomStorage } from '@/utils/customStorage';
import { usePathname, useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

export default function FixRoute({ children }) {
  const { getMeFunc, logoutUserFunc } = useContext(AuthContext);

  const pathname = usePathname()
  const { authPaths, _ } = useState([
    '/dashboard',
    '/settings'
  ])

  const { token } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (CustomStorage.get("token")) {
      if (pathname == '/') {
        router.push('/dashboard')
      }
    } else {
      const isProtected = authPaths?.some(p => pathname.startsWith(p))
      if (isProtected) {
        router.push('/')
      }
    }
  }, [pathname, token, router])

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getMeFunc();
        if (!user?.role) {
          if (CustomStorage.get("token")) {
            logoutUserFunc();
          } else
            router.push('/');
        }
      } catch (error) {
        router.push('/');
      }
    }

    fetchUser();
  }, [token]);

  return <>
    {children}
  </>

}
