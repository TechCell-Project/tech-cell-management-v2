import { ApiTags } from '@/constants/enum';
import { axiosInstance } from '@/lib/axios';
import type { User } from '~user-mnt/models';
import { AuthLogin } from '../models';

export const loginApi = (payload: AuthLogin) =>
  axiosInstance.post<User>(`${ApiTags.Auth}/login`, payload);
