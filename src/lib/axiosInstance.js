import { CustomStorage } from '@/utils/customStorage';
import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: 'https://site46339-a7pcm8.scloudsite101.com/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});


axiosInstance.interceptors.request.use(
  (config) => {
    const token = CustomStorage.get('token');
    console.log('Token from Cookie:', token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
