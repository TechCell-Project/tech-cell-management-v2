import { PaginationResponse } from '@/common/model';
import { Brand } from '../models';

export type BrandState = {
  listBrand?: PaginationResponse<Brand>;
};

export type BrandAction = {
  getListSuccess: (payload: PaginationResponse<Brand>) => void;
  reset: () => void;
};

export type BrandStore = BrandState & BrandAction;
