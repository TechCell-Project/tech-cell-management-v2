import { Timestamp } from '@/common/model';
import { User as UserDto, UserProviderEnum, UserRoleEnum } from '@techcell/node-sdk';

export class User extends Timestamp implements UserDto {
  _id = '';
  email = '';
  emailVerified: boolean = false;
  provider: UserProviderEnum = UserProviderEnum.Email;
  socialId = '';
  firstName = '';
  lastName = '';
  role = UserRoleEnum.Manager;
  avatar = undefined;
  address = undefined;
  block = undefined;
}
