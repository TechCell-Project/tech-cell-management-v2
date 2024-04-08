import { ReactNode } from 'react';
import { User } from './user';

export type UserActionProps = {
  user: User;
  trigger: ReactNode | string;
};
