import axios, { HttpStatusCode, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import { getOneSessionStorage, setOneSessionStorage } from '@/utilities/session.util';
import { ApiTags } from '@/constants/enum';
import { User } from '~user-mnt/models';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const user = getOneSessionStorage<User>('user', 'object');
    if (user) {
      config.headers.Authorization = `Bearer ${(user as User).accessToken}`;
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
      const user = getOneSessionStorage<User>('user', 'object');

      if (!user) {
        return Promise.reject(error);
      }

      try {
        const { data } = await axiosInstance.post<User>(`${ApiTags.Auth}/refresh-token`, {
          data: { refreshToken: (user as User).refreshToken },
        });

        setOneSessionStorage<User>('user', data);
        prevRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        return axiosInstance(prevRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
