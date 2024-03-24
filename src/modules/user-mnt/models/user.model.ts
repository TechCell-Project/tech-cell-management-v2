import { ImageObj, Timestamp } from '@/common/model';
import { Address } from '~address/models';
import { ActivityLog } from './user-activity-log.model';
import { Roles } from '@/constants/enum';

export class User extends Timestamp {
  _id: string = '';
  email: string = '';
  emailVerified: boolean = false;
  role: Roles = Roles.Manager;
  userName: string = '';
  avatar: ImageObj = new ImageObj();
  avatarPublicId?: string = '';
  address: Address[] = [];
  accessToken: string = '';
  refreshToken: string = '';
  firstName: string = '';
  lastName: string = '';
  block?: {
    isBlocked?: boolean;
    activityLogs?: ActivityLog[];
  };
}
