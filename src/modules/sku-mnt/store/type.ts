import { PaginationResponse } from '@/common/model';
import { Sku } from '../models';

export type SkuState = {
  listSku?: PaginationResponse<Sku>;
};

export type SkuAction = {
  getListSuccess: (payload: PaginationResponse<Sku>) => void;
  reset: () => void;
};

export type SkuStore = SkuState & SkuAction;
