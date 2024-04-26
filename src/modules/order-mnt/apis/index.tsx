import { PaginationResponse } from '@/common/model';
import { ApiTags } from '@/constants/enum';
import { axiosInstance } from '@/lib/axios';
import { Order } from '../models';
import { UpdateOrderStatusDto } from '@techcell/node-sdk';

export const getListOrderApi = (params: string) =>
  axiosInstance.get<PaginationResponse<Order>>(ApiTags.OrderMnt + '?' + params);

export const getOneOrderApi = (id: string) => axiosInstance.get<Order>(ApiTags.OrderMnt + '/' + id);

export const patchOneOrderApi = (id: string, payload: UpdateOrderStatusDto) =>
  axiosInstance.patch(ApiTags.OrderMnt + '/' + id, payload);
