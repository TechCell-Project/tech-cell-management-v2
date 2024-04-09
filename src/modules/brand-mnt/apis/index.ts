import { ApiTags } from '@/constants/enum';
import { axiosInstance } from '@/lib/axios';
import { Brand, BrandCreateNew, BrandUpdate } from '../models';
import { PaginationResponse } from '@/common/model';

export const getOneBrandApi = (id: string) => axiosInstance.get<Brand>(`${ApiTags.BrandMnt}/${id}`);

export const getListBrandApi = (params: string) =>
  axiosInstance.get<PaginationResponse<Brand>>(`${ApiTags.BrandMnt}?${params}`);

export const postBrandApi = (payload: BrandCreateNew) => axiosInstance.post(ApiTags.BrandMnt, payload);

export const patchBrandApi = (id: string, payload: Partial<BrandUpdate>) =>
  axiosInstance.patch(`${ApiTags.BrandMnt}/${id}`, payload);

export const deleteBrandApi = (id: string) => axiosInstance.delete(`${ApiTags.BrandMnt}/${id}`);
