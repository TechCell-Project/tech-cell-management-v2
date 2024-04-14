import { PaginationResponse } from '@/common/model';
import { Tag } from '../models';

export type TagState = {
  listTag?: PaginationResponse<Tag>;
};

export type TagAction = {
  getListSuccess: (payload: PaginationResponse<Tag>) => void;
  reset: () => void;
};

export type TagStore = TagState & TagAction;
