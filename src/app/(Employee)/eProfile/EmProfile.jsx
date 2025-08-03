'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FiEdit, FiUpload, FiFileText, FiSave } from 'react-icons/fi';
import { useForm } from 'react-hook-form';

export default function EmployeeProfile() {
  const [isEditing, setIsEditing] = useState(false);



  return (
    <section className="min-h-screen bg-gray-50 px-4 py-8 md:ml-[280px]">
      <h2 className="text-2xl md:ml-62 mt-3 font-bold text-gray-700">Employee Profile</h2>

     
    </section>
  );
}
