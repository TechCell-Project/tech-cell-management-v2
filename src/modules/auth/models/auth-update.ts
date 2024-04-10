import { Address } from '~address/models';

export class AuthUpdate {
  firstName: string = '';
  lastName: string = '';
  password: string = '';
  oldPassword: string = '';
  address: Address[] = [];
  avatarImageId?: string;
}

export type AuthUpdatePw = Pick<AuthUpdate, 'oldPassword' | 'password'> & {
  re_password: string;
};

export type AuthUpdateInfo = Pick<AuthUpdate, 'firstName' | 'lastName'>;
