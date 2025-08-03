'use client'
import React, { useState, useEffect } from 'react'
import { MdDarkMode, MdOutlineWbSunny } from 'react-icons/md'

export default function Mbutton() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
        document.documentElement.classList.add('dark')

    } else {
        document.documentElement.classList.remove('dark')

    }
  }, [darkMode]) 

  return (
    <div>
      <button
        className='cursor-pointer text-2xl'
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? <MdOutlineWbSunny /> : <MdDarkMode />}
      </button>
    </div>
  )
}
