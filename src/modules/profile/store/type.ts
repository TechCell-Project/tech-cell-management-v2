import { User } from '~user-mnt/models';

export type ProfileState = {
  profile?: User;
};

export type ProfileAction = {
  setProfile: (profile: User) => void;
  resetProfile: () => void;
};

export type ProfileStore = ProfileState & ProfileAction;
