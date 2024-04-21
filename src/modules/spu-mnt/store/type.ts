import { PaginationResponse } from '@/common/model';
import { Spu } from '../models';

export type SpuState = {
  listSpu?: PaginationResponse<Spu>;
  spu?: Spu;
};

export type SpuAction = {
  getListSuccess: (payload: PaginationResponse<Spu>) => void;
  getOneSuccess: (payload: Spu) => void;
  reset: () => void;
  resetOne: () => void;
};

export type SpuStore = SpuState & SpuAction;
