import { AuthLoginResponse } from '../models';

export type AuthState = {
  user?: AuthLoginResponse;
  isLoading: boolean;
  isSignedIn: boolean;
};

export type AuthAction = {
  fetching: () => void;
  fetched: () => void;
  setUser: (user: AuthLoginResponse) => void;
  logout: () => void;
};

export type AuthStore = AuthState & AuthAction;
