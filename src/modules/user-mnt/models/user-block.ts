import { ActivityLogBlock } from './user-activity-log';

export class UserBlock {
  isBlocked: boolean = false;
  activityLogs: ActivityLogBlock = new ActivityLogBlock();
}
