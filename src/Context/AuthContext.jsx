'use client';

import { useRouter } from 'next/navigation';
import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import { CustomStorage } from '@/utils/customStorage';

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);
  const [mfaRequired, setMfaRequired] = useState(false);
  const [tempToken, setTempToken] = useState(null);
  const [qrCode, setQrCode] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const savedToken = CustomStorage.get('token');
    if (savedToken) {
      setToken(savedToken);
      setTempToken(savedToken);
    }
  }, []);

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          logoutUserFunc();
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, [token]);

  async function loginUserFunc(values) {
    try {
      const { data } = await axiosInstance.post(`/auth/login`, values);


      if (data.message === 'MFA required') {
        setTempToken(data.temp_token);
        CustomStorage.set('token', data.temp_token);
        setMfaRequired(true);
        router.push('/enableMfa');
        return;
      }

      CustomStorage.set("user", JSON.stringify(data.user))
      if (data.access_token) {
        CustomStorage.set('token', data.access_token, {
          expires: 1,
          secure: true,
          sameSite: 'Strict',
        });
        setToken(data.access_token);
        router.push('/dashboard');
        return;
      }
    } catch (error) {

      throw error;
    }
  }

  async function enableMfaFunc() {
    try {
      const authHeader = tempToken || CustomStorage.get('token');

      await axiosInstance.post(
        '/2fa/enable', {},
        {
          headers: {
            Authorization: `Bearer ${authHeader}`,
          },
        }
      );

      const { data } = await axiosInstance.get('/2fa/qr-code', {
        headers: {
          Authorization: `Bearer ${authHeader}`,
        },
      });

      setQrCode(data.qr_code_svg);
      return data.qr_code_svg;
    } catch (err) {

      throw err;
    }
  }

  async function verifyMfaFunc(code) {
    try {
      const authHeader = tempToken || CustomStorage.get('token');

      // console.log(' MFA Code Sent:', code);
      // console.log(' Auth Header:', authHeader);

      const { data } = await axiosInstance.post(
        '/2fa/verify',
        { code },
        {
          headers: {
            Authorization: `Bearer ${authHeader}`,
          },
        }
      );


      CustomStorage.set('token', data.access_token, {
        expires: 1,
        secure: true,
        sameSite: 'Strict',
      });

      CustomStorage.setObj("user", data.user)
      setRole(data.role)
      setToken(data.access_token);
      await getMeFunc();
      router.push('/dashboard');

      return data;
    } catch (error) {
      // console.error('Verification Error:', error.response?.data || error.message);
      throw error;
    }
  }


  async function logoutUserFunc() {
    const authHeader = CustomStorage.get('token');

    try {
      axiosInstance.delete('/2fa/disable', {
        headers: {
          Authorization: `Bearer ${authHeader}`,
        },
      });
    } catch (err) {
      // console.error(' Logout Error:', err.response?.data || err.message);
    }

    CustomStorage.remove("user")
    CustomStorage.remove("token")
    setToken(null);
    setTempToken(null);
    router.push('/');
  }


  async function getMeFunc() {
    try {
      const data = CustomStorage.getObj("user")
      setRole(data?.role);
      return data;

    } catch (error) {
      try {
        const { data } = await axiosInstance.get('/auth/me');
        return data
      } catch (error) {
        throw error;
      }
    }
  }

  async function refreshTokenFunc() {
    try {
      const { data } = await axiosInstance.post('/auth/refresh');
      CustomStorage.set('token', data.access_token, {
        expires: 1,
        secure: true,
        sameSite: 'Strict',
      });
      setToken(data.access_token);

      return data.access_token;
    } catch (error) {

      logoutUserFunc();
      throw error;
    }
  }

  async function forgetPasswordFunc(email) {
    try {
      const { data } = await axiosInstance.post(`/auth/forgot-password`, { email });

      return data;
    } catch (error) {

      throw error;
    }
  }

  async function resetPasswordFunc(values) {
    try {
      const { data } = await axiosInstance.post(
        `/auth/reset-password?token=${values.token}&email=${values.email}`,
        { password: values.password }
      );

      return data;
    } catch (error) {

      throw error;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        loginUserFunc,
        verifyMfaFunc,
        enableMfaFunc,
        logoutUserFunc,
        getMeFunc,
        refreshTokenFunc,
        forgetPasswordFunc,
        resetPasswordFunc,
        role,
        token,
        mfaRequired,
        qrCode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}







