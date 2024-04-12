import { PaginationResponse } from '@/common/model';
import { Attribute } from '../models';

export type AttributeState = {
  listAttribute?: PaginationResponse<Attribute>;
};

export type AttributeAction = {
  getListSuccess: (payload: PaginationResponse<Attribute>) => void;
  reset: () => void;
};

export type AttributeStore = AttributeState & AttributeAction;
