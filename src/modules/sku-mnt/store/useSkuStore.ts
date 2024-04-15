import { create } from 'zustand';
import { SkuState, SkuStore } from './type';
import { immer } from 'zustand/middleware/immer';
import { PaginationResponse } from '@/common/model';
import { Sku } from '../models';

const initialState: SkuState = {
  listSku: undefined,
  sku: undefined,
};

export const useSkuStore = create<SkuStore>()(
  immer((set) => ({
    ...initialState,
    getListSuccess: (payload: PaginationResponse<Sku>) => {
      set((state) => {
        state.listSku = payload;
      });
    },
    getOneSuccess: (payload: Sku) => {
      set((state) => {
        state.sku = payload;
      });
    },
    reset: () => {
      set(initialState);
    },
  })),
);
