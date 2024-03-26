import { ApiTags } from '@/constants/enum';
import { axiosInstance } from '@/lib/axios';
import { User } from '~user-mnt/models';
import { ProfileUpdateAddress } from '../models';

export const getProfileApi = () => axiosInstance.get<User>(ApiTags.Profile);

export const updateProfileInfoApi = (payload: Partial<User>) =>
  axiosInstance.patch<User>(`${ApiTags.Profile}/info`, payload);

export const updateProfileAddressApi = (payload: ProfileUpdateAddress) =>
  axiosInstance.patch<User>(`${ApiTags.Profile}/address`, payload);
