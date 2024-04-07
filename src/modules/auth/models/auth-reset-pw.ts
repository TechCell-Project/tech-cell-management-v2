import { AuthResetPasswordDto } from '@techcell/node-sdk';

export class AuthResetPassword implements AuthResetPasswordDto {
  password = '';
  hash = '';

  constructor(hash: string) {
    this.hash = hash;
  }
}
