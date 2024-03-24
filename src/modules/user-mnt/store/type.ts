import { PaginationResponse } from '@/common/model';
import type { User } from '../models';

export type UserState = {
  listUser?: PaginationResponse<User>;
  user?: User;
};

export type UserAction = {
  getListSuccess: (payload: PaginationResponse<User>) => void;
  getOneSucess: (payload: User) => void;
};

export type UserStore = UserState & UserAction;
