'use client'
import { AuthContext } from '@/Context/AuthContext'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect } from 'react'

export default function Protected({ children }) {

    const {token} = useContext(AuthContext)
    const router = useRouter()
    useEffect(() => {
        if (!token) {
            
          router.push('/')
        }
      }, [token, router])


      return <> {children} </>;

}
