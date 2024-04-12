import { ApiTags } from '@/constants/enum';
import { axiosInstance } from '@/lib/axios';
import { Attribute, AttributeCreateNew, AttributeUpdate } from '../models';
import { PaginationResponse } from '@/common/model';

export const postOneAttributeApi = (payload: AttributeCreateNew) =>
  axiosInstance.post(ApiTags.AttributeMnt, payload);

export const getOneAttributeApi = (id: string) =>
  axiosInstance.get<Attribute>(`${ApiTags.AttributeMnt}/${id}`);

export const getListAttributeApi = (params: string) =>
  axiosInstance.get<PaginationResponse<Attribute>>(`${ApiTags.AttributeMnt}?${params}`);

export const patchOneAttributeApi = (id: string, payload: Partial<AttributeUpdate>) =>
  axiosInstance.patch(`${ApiTags.AttributeMnt}/${id}`, payload);

export const deleteOneAttributeApi = (id: string) =>
  axiosInstance.delete(`${ApiTags.AttributeMnt}/${id}`);
