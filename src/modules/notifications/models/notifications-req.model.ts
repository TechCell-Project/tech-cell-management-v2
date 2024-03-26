import { PaginationRequest } from '@/common/model';

type ReadType = 'read' | 'unread' | 'all';
type OrderBy = 'newest' | 'oldest';

export class NotificationsReq extends PaginationRequest {
  readType: ReadType = 'all';
  orderBy: OrderBy = 'newest';
}
