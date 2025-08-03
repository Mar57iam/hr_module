'use client';

import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/Context/AuthContext';

export default function VerifyMfa() {
  const { verifyMfaFunc } = useContext(AuthContext);

  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();



  async function handleVerify(e) {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    

    try {
      await verifyMfaFunc(code);
  
    } catch (err) {
      const serverMessage = err.response?.data?.message || 'Invalid code, please try again.';
      setError(serverMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-sm p-8 bg-white shadow-md rounded">
        <h2 className="text-xl mb-4 font-semibold text-center">Verify MFA</h2>

        <form onSubmit={handleVerify} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter MFA Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="border p-2 rounded"
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {isLoading ? 'Verifying...' : 'Verify'}
          </button>
        </form>
      </div>
    </div>
  );
}
