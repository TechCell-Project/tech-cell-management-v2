import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { AuthState, AuthStore } from './type';
import type { User } from '~user-mnt/models';
import { getOneSessionStorage, removeOneSessionStorage } from '@/utilities/session.util';

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
    setUser: (user: User) => {
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

const rehydrateAuthState = () => {
  const user = getOneSessionStorage<User>('user', 'object');
  if (user) {
    useAuthStore.setState({
      isLoading: false,
      isSignedIn: true,
      user: user as User,
    });
  }
};

rehydrateAuthState();
