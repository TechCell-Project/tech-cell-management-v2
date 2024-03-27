import { ImageObj, Timestamp } from '@/common/model';
import { Address } from '~address/models';
import { ActivityLog } from './user-activity-log.model';
import { Roles } from '@/constants/enum';

type UserProvider = 'google' | 'facebook' | 'apple' | 'email';

export class User extends Timestamp {
  _id: string = '';
  email: string = '';
  emailVerified: boolean = false;
  provider: UserProvider = 'email';
  socialId: string = '';
  firstName: string = '';
  lastName: string = '';
  userName: string = '';
  role: Roles = Roles.Manager;
  avatar?: ImageObj;
  address?: Address[] = [];
  block?: {
    isBlocked?: boolean;
    activityLogs?: ActivityLog[];
  };
}
