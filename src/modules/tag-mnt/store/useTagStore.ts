import { create } from 'zustand';
import { TagState, TagStore } from './type';
import { immer } from 'zustand/middleware/immer';
import { PaginationResponse } from '@/common/model';
import { Tag } from '../models';

const initialState: TagState = {
  listTag: undefined,
};

export const useTagStore = create<TagStore>()(
  immer((set) => ({
    ...initialState,
    getListSuccess: (payload: PaginationResponse<Tag>) => {
      set((state) => {
        state.listTag = payload;
      });
    },
    reset: () => {
      set(initialState);
    },
  })),
);
