import { BlockActivityLogDto } from '@techcell/node-sdk';

export class ActivityLog {
  action: string = '';
  actionAt: string = '';
  actionBy: string = '';
  reason: string = '';
  note: string = '';
}

export class ActivityLogBlock implements BlockActivityLogDto {
  reason = '';
  note?: string;
}
