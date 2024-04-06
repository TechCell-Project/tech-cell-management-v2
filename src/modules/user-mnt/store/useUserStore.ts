import { create } from 'zustand';
import { UserState, UserStore } from './type';
import { immer } from 'zustand/middleware/immer';
import { PaginationResponse } from '@/common/model';
import { User } from '../models';

const initialState: UserState = {
  listUser: undefined,
  user: undefined,
};

export const useUserStore = create<UserStore>()(
  immer((set) => ({
    ...initialState,
    getListSuccess: (payload: PaginationResponse<User>) => {
      set((state) => {
        state.listUser = payload;
      });
    },
    getOneSucess: (payload: User) => {
      set((state) => {
        state.user = payload;
      });
    },
    updateUserInList: (payload: User) => {
      set((state) => {
        const index = state.listUser?.data.findIndex((user) => user._id === payload._id);
        if (index !== -1) {
          state.listUser!.data[index as number] = payload;
        }
      });
    },
    reset: () => {
      set(initialState);
    },
  })),
);
