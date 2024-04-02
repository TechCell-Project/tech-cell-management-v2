import { ApiTags } from '@/constants/enum';
import { axiosInstance } from '@/lib/axios';
import { District, Province, Ward } from '../models';

export const getListProvinceApi = () =>
  axiosInstance.get<Province[]>(`${ApiTags.Address}/provinces`);

export const getListDistrictApi = (province_id: string) =>
  axiosInstance.get<District[]>(`${ApiTags.Address}/districts/${province_id}`);

export const getListWardApi = (district_id: string) =>
  axiosInstance.get<Ward[]>(`${ApiTags.Address}/wards/${district_id}`);
