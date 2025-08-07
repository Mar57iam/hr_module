'use client'
import { AuthContext } from '@/Context/AuthContext'
import { usePathname, useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

export default function Protected({ children }) {

  const pathname = usePathname()
  const { protectedPaths, _ } = useState([
    '/dashboard',
    '/settings'
  ])

  const { token } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    const isProtected = protectedPaths.some(p => pathname.startsWith(p))
    if (isProtected) {
      if (!token) {
        router.push('/')
      }
    }
  }, [token, router])

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getMeFunc();
        if (user?.user?.role) {
          localStorage.setItem("user", user.user)
        } else {
          router.push('/');
        }
      } catch (error) {
        router.push('/');
      }
    }

    fetchUser();
  }, [token]);

  return <> {children} </>;

}
