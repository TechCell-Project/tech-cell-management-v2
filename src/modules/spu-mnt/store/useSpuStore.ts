import { create } from 'zustand';
import { SpuState, SpuStore } from './type';
import { immer } from 'zustand/middleware/immer';
import { PaginationResponse } from '@/common/model';
import { Spu } from '../models';

const initialState: SpuState = {
  listSpu: undefined,
  spu: undefined,
};

export const useSpuStore = create<SpuStore>()(
  immer((set) => ({
    ...initialState,
    getListSuccess: (payload: PaginationResponse<Spu>) => {
      set((state) => {
        state.listSpu = payload;
      });
    },
    getOneSuccess: (payload: Spu) => {
      set((state) => {
        state.spu = payload;
      });
    },
    reset: () => {
      set(initialState);
    },
    resetOne: () => {
      set((state) => {
        state.spu = initialState.spu;
      });
    },
  })),
);
