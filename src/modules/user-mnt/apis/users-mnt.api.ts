import { getSearchParams } from '@/utilities/func.util';
import { axiosInstance } from '@/lib/axios';
import { PaginationResponse } from '@/common/model';
import { User, UserBlock, UserCreateNew, UserSearcn } from '../models';
import { ApiTags } from '@/constants/enum';

export const getListUserApi = (params: UserSearcn) =>
  axiosInstance.get<PaginationResponse<User>>(ApiTags.Users + '?' + getSearchParams(params));

export const getOneUserApi = (id: string) => axiosInstance.get<User>(ApiTags.Users + '/' + id);

export const postOneUserApi = (payload: UserCreateNew) =>
  axiosInstance.post<User>(ApiTags.Users, payload);

export const patchOneUserApi = (id: string, type: 'block' | 'unblock', data: UserBlock) =>
  axiosInstance.patch(`${ApiTags.Users}/${id}/${type}`, { data });
