import { PaginationResponse } from '@/common/model';
import { Order } from '../models';

export type OrderState = {
  listOrder?: PaginationResponse<Order>;
  order?: Order;
};

export type OrderAction = {
  getListSuccess: (payload: PaginationResponse<Order>) => void;
  getOneSuccess: (payload: Order) => void;
  reset: () => void;
  resetOne: () => void;
};

export type OrderStore = OrderState & OrderAction;
