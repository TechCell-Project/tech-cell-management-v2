import { BlockUserDto, BlockUserDtoActionEnum } from '@techcell/node-sdk';
import { ActivityLogBlock } from './user-activity-log';

export class UserBlock implements BlockUserDto {
  action: BlockUserDtoActionEnum = BlockUserDtoActionEnum.Block;
  activityLogs: ActivityLogBlock = new ActivityLogBlock();

  constructor(action?: BlockUserDtoActionEnum) {
    if (action) {
      this.action = action;
    }
  }
}
