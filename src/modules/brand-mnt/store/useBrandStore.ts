import { create } from 'zustand';
import { BrandState, BrandStore } from './type';
import { immer } from 'zustand/middleware/immer';
import { PaginationResponse } from '@/common/model';
import { Brand } from '@techcell/node-sdk';

const initialState: BrandState = {
  listBrand: undefined,
};

export const useBrandStore = create<BrandStore>()(
  immer((set) => ({
    ...initialState,
    getListSuccess: (payload: PaginationResponse<Brand>) => {
      set((state) => {
        state.listBrand = payload;
      });
    },
    reset: () => {
      set(initialState);
    },
  })),
);
