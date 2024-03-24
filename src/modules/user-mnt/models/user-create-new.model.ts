import { Roles } from '@/constants/enum';

export class UserCreateNew {
  userName: string = '';
  password: string = '';
  role?: Roles;
  email?: string;
  firstName?: string;
  lastName?: string;
}
