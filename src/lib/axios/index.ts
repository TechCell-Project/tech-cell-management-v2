import axios, { HttpStatusCode, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import axiosRetry from 'axios-retry';
import { getOneSessionStorage, setOneSessionStorage } from '@/utilities/session.util';
import { AuthLoginResponse } from '~auth/models';
import { refreshAction } from '~auth/actions';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  timeout: 5000,
});

axiosRetry(axiosInstance, {
  retries: 3,
  retryDelay: (retryCount) => retryCount * 1000,
  retryCondition: (error) =>
    axiosRetry.isNetworkOrIdempotentRequestError(error) || axiosRetry.isSafeRequestError(error),
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const user = getOneSessionStorage<AuthLoginResponse>('user', 'object');

    if (user) {
      // if (Date.now() > (user as AuthLoginResponse).accessTokenExpires) {
      //   const data = await refreshAction((user as AuthLoginResponse).refreshToken);

      //   setOneSessionStorage<AuthLoginResponse>('user', {
      //     ...(user as AuthLoginResponse),
      //     accessToken: data.accessToken,
      //     refreshToken: data.refreshToken,
      //     accessTokenExpires: data.accessTokenExpires,
      //   });
      // }
      config.headers.Authorization = `Bearer ${(user as AuthLoginResponse).accessToken}`;
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

      if (user) {
        try {
          const data = await refreshAction((user as AuthLoginResponse).refreshToken);

          setOneSessionStorage<AuthLoginResponse>('user', {
            ...(user as AuthLoginResponse),
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
