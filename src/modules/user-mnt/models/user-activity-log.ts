export class ActivityLog {
  action: string = '';
  actionAt: string = '';
  actionBy: string = '';
  reason: string = '';
  note: string = '';
}

export class ActivityLogBlock {
  reason: string = '';
  note?: string;
}
