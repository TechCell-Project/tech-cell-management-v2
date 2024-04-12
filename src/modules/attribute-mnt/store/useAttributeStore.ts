import { create } from 'zustand';
import { AttributeState, AttributeStore } from './type';
import { immer } from 'zustand/middleware/immer';
import { PaginationResponse } from '@/common/model';
import { Attribute } from '../models';

const initialState: AttributeState = {
  listAttribute: undefined,
};

export const useAttributeStore = create<AttributeStore>()(
  immer((set) => ({
    ...initialState,
    getListSuccess: (payload: PaginationResponse<Attribute>) => {
      set((state) => {
        state.listAttribute = payload;
      });
    },
    reset: () => {
      set(initialState);
    },
  })),
);
