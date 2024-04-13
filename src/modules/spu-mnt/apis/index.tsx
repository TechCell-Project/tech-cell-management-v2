import { axiosInstance } from '@/lib/axios';
import { ApiTags } from '@/constants/enum';
import { PaginationResponse } from '@/common/model';
import { Spu, SpuCreatNew, SpuModelCreate, SpuModelUpdate, SpuUpdate } from '../models';

export const postOneSpuApi = (payload: SpuCreatNew) => axiosInstance.post(ApiTags.SpuMnt, payload);

export const getListSpuApi = (params: string) =>
  axiosInstance.get<PaginationResponse<Spu>>(ApiTags.SpuMnt + '?' + params);

export const getOneSpuApi = (id: string) => axiosInstance.get<Spu>(ApiTags.SpuMnt + '/' + id);

export const patchOneSpuApi = (id: string, payload: Partial<SpuUpdate>) =>
  axiosInstance.patch(ApiTags.SpuMnt + '/' + id, payload);

export const postOneSpuModelApi = (id: string, payload: SpuModelCreate) =>
  axiosInstance.post(`${ApiTags.SpuMnt}/${id}/models`, payload);

export const patchOneSpuModelApi = (id: string, slug: string, payload: Partial<SpuModelUpdate>) =>
  axiosInstance.patch(`${ApiTags.SpuMnt}/${id}/models/${slug}`, payload);
