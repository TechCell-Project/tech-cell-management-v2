import { Address } from '~address/models';

export class AuthUpdate {
  userName: string = '';
  firstName: string = '';
  lastName: string = '';
  password: string = '';
  oldPassword: string = '';
  address: Address[] = [];
}

export type AuthUpdatePw = Pick<AuthUpdate, 'oldPassword' | 'password'> & {
  re_password: string;
};
