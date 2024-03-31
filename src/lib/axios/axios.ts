import axios, { HttpStatusCode, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import { getOneSessionStorage, setOneSessionStorage } from '@/utilities/session.util';
import { isType } from '@/utilities/func.util';
import { AuthLoginResponse } from '~auth/models';
import { refreshAction } from '~auth/actions';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const user = getOneSessionStorage<AuthLoginResponse>('user', 'object');
    if (isType(user, AuthLoginResponse)) {
      if (Date.now() > user.accessTokenExpires) {
        const data = await refreshAction();

        setOneSessionStorage<AuthLoginResponse>('user', {
          ...user,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          accessTokenExpires: data.accessTokenExpires,
        });
      }

      config.headers.Authorization = `Bearer ${user.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error.config;
    const status = error.response?.status;

    if (status === HttpStatusCode.Unauthorized) {
      const user = getOneSessionStorage<AuthLoginResponse>('user', 'object');

      if (isType(user, AuthLoginResponse)) {
        try {
          const data = await refreshAction();

          setOneSessionStorage<AuthLoginResponse>('user', {
            ...user,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            accessTokenExpires: data.accessTokenExpires,
          });

          prevRequest.headers.Authorization = `Bearer ${data.accessToken}`;

          return axiosInstance(prevRequest);
        } catch (error) {
          return Promise.reject(error);
        }
      } else {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
