import { ApiTags } from '@/constants/enum';
import { axiosInstance } from '@/lib/axios';
import type { User } from '~user-mnt/models';
import { AuthLogin, AuthLoginResponse, AuthResetPassword, AuthUpdate } from '../models';

export const loginApi = (payload: AuthLogin) =>
  axiosInstance.post<AuthLoginResponse>(`${ApiTags.Auth}/email/login`, payload);

export const logoutApi = () => axiosInstance.post(`${ApiTags.Auth}/logout`);

export const refreshApi = () =>
  axiosInstance.post<Omit<AuthLoginResponse, 'user'>>(`${ApiTags.Auth}/refresh`);

export const forgotPasswordApi = (email: string) =>
  axiosInstance.post(`${ApiTags.Auth}/forgot/password`, { email });

export const resetPasswordApi = (payload: AuthResetPassword) =>
  axiosInstance.post(`${ApiTags.Auth}/reset/password`, payload);

export const getMeApi = () => axiosInstance.get<User>(`${ApiTags.Auth}/me`);

export const patchMeApi = (payload: Partial<AuthUpdate>) =>
  axiosInstance.patch(`${ApiTags.Auth}/me`, payload);
