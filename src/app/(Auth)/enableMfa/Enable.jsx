'use client';

import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/Context/AuthContext';

export default function EnableMfa() {
  const { enableMfaFunc, qrCode } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleEnable() {
    setLoading(true);
    await enableMfaFunc();
    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h2 className="text-xl mb-4 font-semibold">Enable MFA</h2>

      {!qrCode && (
        <button
          onClick={handleEnable}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Enabling...' : 'Enable MFA'}
        </button>
      )}

      {qrCode && (
        <>
          <div
            className="mt-4"
            dangerouslySetInnerHTML={{ __html: qrCode }}
          />
          <button
            onClick={() => router.push('/verify')}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            Next: Verify MFA
          </button>
        </>
      )}
    </div>
  );
}
