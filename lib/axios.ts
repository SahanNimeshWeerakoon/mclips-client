import axios from 'axios'
import { store } from '@/store/store'
import { logout } from '@/store/authSlice'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL as string,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(config => {
  const state = store.getState();
  const token = state.auth.token || localStorage.getItem('token');

  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

axiosInstance.interceptors.response.use(
    res => res,
    err => {
        if(err.response?.status === 401) store.dispatch(logout());
        return Promise.reject(err);
    }
);

export default axiosInstance;