import { ApiTags } from '@/constants/enum';
import { axiosInstance } from '@/lib/axios';
import type { User } from '~user-mnt/models';
import { AuthLogin, AuthLoginResponse, AuthResetPassword, AuthUpdate } from '../models';

export const loginApi = (payload: AuthLogin) =>
  axiosInstance.post<AuthLoginResponse>(`${ApiTags.Auth}/email/login`, payload);

export const logoutApi = () => axiosInstance.post(`${ApiTags.Auth}/logout`);

export const refreshApi = (refreshToken: string) =>
  axiosInstance.post<Omit<AuthLoginResponse, 'user'>>(`${ApiTags.Auth}/refresh`, undefined, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

export const forgotPasswordApi = (email: string) =>
  axiosInstance.post(`${ApiTags.Auth}/forgot/password`, { email });

export const resetPasswordApi = (payload: AuthResetPassword) =>
  axiosInstance.post(`${ApiTags.Auth}/reset/password`, payload);

export const getMeApi = () => axiosInstance.get<User>(`${ApiTags.Auth}/me`);

export const patchMeApi = (payload: Partial<AuthUpdate>) =>
  axiosInstance.patch<User>(`${ApiTags.Auth}/me`, payload);
