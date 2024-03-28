import { ApiTags } from '@/constants/enum';
import { axiosInstance } from '@/lib/axios';
import type { User } from '~user-mnt/models';
import {
  AuthChangePassword,
  AuthLogin,
  AuthLoginResponse,
  AuthVerifyForgotPassword,
} from '../models';

export const loginApi = (payload: AuthLogin) =>
  axiosInstance.post<AuthLoginResponse>(`${ApiTags.Auth}/email/login`, payload);

export const meApi = () => axiosInstance.get<User>(`${ApiTags.Auth}/me`);

export const logoutApi = () => axiosInstance.post(`${ApiTags.Auth}/logout`);

export const refreshApi = () => axiosInstance.post(`${ApiTags.Auth}/refresh`);

export const forgotPasswordApi = (email: string) =>
  axiosInstance.post(`${ApiTags.Auth}/forgot-password`, { email });

export const verifyForgotPasswordApi = (payload: AuthVerifyForgotPassword) =>
  axiosInstance.post(`${ApiTags.Auth}/verify-forgot-password`, payload);

export const changePasswordApi = (payload: AuthChangePassword) =>
  axiosInstance.post(`${ApiTags.Auth}/change-password`, payload);
