import { AuthForgotPasswordDto } from '@techcell/node-sdk';

export class AuthForgotPw implements AuthForgotPasswordDto {
  email = '';
  returnUrl = '';

  constructor(returnUrl: string) {
    this.returnUrl = returnUrl;
  }
}
