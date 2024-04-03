import { getSearchParams } from '@/utilities/func.util';
import { axiosInstance } from '@/lib/axios';
import { PaginationResponse } from '@/common/model';
import { User, UserUpdate, UserCreateNew, UserSearch } from '../models';
import { ApiTags } from '@/constants/enum';

export const getListUserApi = (params: string) =>
  axiosInstance.get<PaginationResponse<User>>(ApiTags.Users + '?' + params);

export const getOneUserApi = (id: string) => axiosInstance.get<User>(ApiTags.Users + '/' + id);

export const postOneUserApi = (payload: UserCreateNew) =>
  axiosInstance.post<User>(ApiTags.Users, payload);

export const patchOneUserApi = (id: string, payload: UserUpdate) =>
  axiosInstance.patch(`${ApiTags.Users}/${id}`, payload);
