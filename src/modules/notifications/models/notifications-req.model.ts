import { PaginationRequest } from '@/common/model';

export type ReadType = 'read' | 'unread' | 'all';
export type OrderBy = 'newest' | 'oldest';

export class NotificationsReq extends PaginationRequest {
  readType: ReadType = 'all';
  orderBy: OrderBy = 'newest';
}
