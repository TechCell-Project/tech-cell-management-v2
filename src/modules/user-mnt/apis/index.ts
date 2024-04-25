import { axiosInstance } from '@/lib/axios';
import { PaginationResponse } from '@/common/model';
import { User, UserUpdate, UserCreateNew } from '../models';
import { ApiTags } from '@/constants/enum';

export const getListUserApi = (params: string) =>
  axiosInstance.get<PaginationResponse<User>>(ApiTags.UserMnt + '?' + params);

export const getOneUserApi = (id: string) => axiosInstance.get<User>(ApiTags.UserMnt + '/' + id);

export const postOneUserApi = (payload: UserCreateNew) =>
  axiosInstance.post<User>(ApiTags.UserMnt, payload);

export const patchOneUserApi = (id: string, payload: Partial<UserUpdate>) =>
  axiosInstance.patch<User>(`${ApiTags.UserMnt}/${id}`, payload);
