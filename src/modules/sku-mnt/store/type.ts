import { PaginationResponse } from '@/common/model';
import { Sku } from '../models';

export type SkuState = {
  listSku?: PaginationResponse<Sku>;
  sku?: Sku;
};

export type SkuAction = {
  getListSuccess: (payload: PaginationResponse<Sku>) => void;
  getOneSuccess: (payload: Sku) => void;
  reset: () => void;
  resetOne: () => void;
};

export type SkuStore = SkuState & SkuAction;
