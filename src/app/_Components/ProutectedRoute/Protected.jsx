'use client'
import { AuthContext } from '@/Context/AuthContext'
import useTranslation from '@/Hooks/useTranslation';
import { usePathname, useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

export default function FixRoute({ children }) {
  const { getMeFunc } = useContext(AuthContext);

  const pathname = usePathname()
  const { authPaths, _ } = useState([
    '/dashboard',
    '/settings'
  ])

  const { token } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (token) {
      if (pathname === '/') {
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
          router.push('/');
        }
      } catch (error) {
        router.push('/');
      }
    }

    fetchUser();
  }, [token]);


  const { lang } = useTranslation()

  return <>
    <div className={`${lang === 'ar' ? `me` : `ms`}-[280px]`}>
      {children}
    </div>
  </>

}
