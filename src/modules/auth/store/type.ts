import type { User } from '~user-mnt/models';

export type AuthState = {
  user?: User;
  isLoading: boolean;
  isSignedIn: boolean;
};

export type AuthAction = {
  fetching: () => void;
  fetched: () => void;
  setUser: (user: User) => void;
  logout: () => void;
};

export type AuthStore = AuthState & AuthAction;
