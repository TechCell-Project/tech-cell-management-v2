import { ApiTags } from '@/constants/enum';
import { axiosInstance } from '@/lib/axios';
import { Tag, TagCreateNew, TagUpdate } from '../models';
import { PaginationResponse } from '@/common/model';

export const postOneTagApi = (payload: TagCreateNew) => axiosInstance.post(ApiTags.TagMnt, payload);

export const getListTagApi = (params: string) =>
  axiosInstance.get<PaginationResponse<Tag>>(ApiTags.TagMnt + '?' + params);

export const getOneTagApi = (id: string) => axiosInstance.get<Tag>(ApiTags.TagMnt + '/' + id);

export const patchOneTagApi = (id: string, payload: Partial<TagUpdate>) =>
  axiosInstance.patch(ApiTags.TagMnt + '/' + id, payload);
