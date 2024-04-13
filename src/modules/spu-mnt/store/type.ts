import { PaginationResponse } from '@/common/model';
import { Spu } from '../models';

export type SpuState = {
  listSpu?: PaginationResponse<Spu>;
};

export type SpuAction = {
  getListSuccess: (payload: PaginationResponse<Spu>) => void;
  reset: () => void;
};

export type SpuStore = SpuState & SpuAction;
