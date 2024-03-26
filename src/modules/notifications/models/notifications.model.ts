type NotificationType = 'newProduct' | 'new-order' | 'order-status-changed';

export class Notifications {
  _id: string = '';
  notificationType: NotificationType = 'new-order';
  recipientId: string = '';
  issuerId: string = '';
  content: string = '';
  readAt: string = '';
  canceledAt: string = '';
  updatedAt: string = '';
  createdAt: string = '';
  data: any
}
