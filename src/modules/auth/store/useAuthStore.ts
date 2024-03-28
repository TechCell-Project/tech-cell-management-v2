import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { AuthState, AuthStore } from './type';
import { getOneSessionStorage, removeOneSessionStorage } from '@/utilities/session.util';
import { AuthLoginResponse } from '../models';

const initialState: AuthState = {
  user: undefined,
  isLoading: false,
  isSignedIn: false,
};

export const useAuthStore = create<AuthStore>()(
  immer((set) => ({
    ...initialState,
    fetching: () => {
      set((state) => {
        state.isLoading = true;
      });
    },
    fetched: () => {
      set((state) => {
        state.isLoading = false;
      });
    },
    setUser: (user: AuthLoginResponse) => {
      set((state) => {
        state.isLoading = false;
        state.isSignedIn = true;
        state.user = user;
      });
    },
    logout: () => {
      set(initialState);
      removeOneSessionStorage('user');
    },
  })),
);

export const rehydrateAuthState = () => {
  const user = getOneSessionStorage<AuthLoginResponse>('user', 'object');
  if (user) {
    useAuthStore.setState({
      isLoading: false,
      isSignedIn: true,
      user: user as AuthLoginResponse,
    });
  }
};
