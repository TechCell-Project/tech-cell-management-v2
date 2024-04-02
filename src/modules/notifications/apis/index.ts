import { ApiTags } from '@/constants/enum';
import { axiosInstance } from '@/lib/axios';
import { Notifications, NotificationsReq } from '../models';
import { getSearchParams } from '@/utilities/func.util';
import { PaginationResponse } from '@/common/model';

export const getNotificationsApi = (params: NotificationsReq) =>
  axiosInstance.get<PaginationResponse<Notifications>>(
    ApiTags.Notifications + '?' + getSearchParams(params),
  );
