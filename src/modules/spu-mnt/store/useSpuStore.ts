import { create } from 'zustand';
import { SpuState, SpuStore } from './type';
import { immer } from 'zustand/middleware/immer';
import { PaginationResponse } from '@/common/model';
import { Spu } from '../models';

const initialState: SpuState = {
  listSpu: undefined,
};

export const useSpuStore = create<SpuStore>()(
  immer((set) => ({
    ...initialState,
    getListSuccess: (payload: PaginationResponse<Spu>) => {
      set((state) => {
        state.listSpu = payload;
      });
    },
    reset: () => {
      set(initialState);
    },
  })),
);
