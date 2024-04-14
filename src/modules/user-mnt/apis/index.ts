import { axiosInstance } from '@/lib/axios';
import { PaginationResponse } from '@/common/model';
import { User, UserUpdate, UserCreateNew } from '../models';
import { ApiTags } from '@/constants/enum';

export const getListUserApi = (params: string) =>
  axiosInstance.get<PaginationResponse<User>>(ApiTags.UsersMnt + '?' + params);

export const getOneUserApi = (id: string) => axiosInstance.get<User>(ApiTags.UsersMnt + '/' + id);

export const postOneUserApi = (payload: UserCreateNew) =>
  axiosInstance.post<User>(ApiTags.UsersMnt, payload);

export const patchOneUserApi = (id: string, payload: Partial<UserUpdate>) =>
  axiosInstance.patch<User>(`${ApiTags.UsersMnt}/${id}`, payload);
