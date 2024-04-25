import { create } from 'zustand';
import { OrderState, OrderStore } from './type';
import { immer } from 'zustand/middleware/immer';
import { PaginationResponse } from '@/common/model';
import { Order } from '../models';

const initialState: OrderState = {
  listOrder: undefined,
  order: undefined,
};

export const useOrderStore = create<OrderStore>()(
  immer((set) => ({
    ...initialState,
    getListSuccess: (payload: PaginationResponse<Order>) => {
      set((state) => {
        state.listOrder = payload;
      });
    },
    getOneSuccess: (payload: Order) => {
      set((state) => {
        state.order = payload;
      });
    },
    reset: () => {
      set(initialState);
    },
    resetOne: () => {
      set((state) => {
        state.order = initialState.order;
      });
    },
  })),
);
