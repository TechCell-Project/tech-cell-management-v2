export class AuthLogin {
  email: string = '';
  password: string = '';

  constructor(auth?: AuthLogin) {
    if (auth) {
      Object.assign(this, auth);
    }
  }
}
