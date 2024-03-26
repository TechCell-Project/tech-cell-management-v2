import { create } from 'zustand';
import { ProfileState, ProfileStore } from './type';
import { immer } from 'zustand/middleware/immer';
import { User } from '~user-mnt/models';

const initialState: ProfileState = {
  profile: undefined,
};

export const useProfileStore = create<ProfileStore>()(
  immer((set) => ({
    ...initialState,
    setProfile: (profile: User) => {
      set((state) => {
        state.profile = profile;
      });
    },
    resetProfile: () => {
      set(initialState);
    },
  })),
);
