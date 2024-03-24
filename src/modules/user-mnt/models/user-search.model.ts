import { PaginationRequest } from '@/common/model';
import { Roles } from '@/constants/enum';

type OrderField = 'email' | 'userName' | 'firstName' | 'lastName' | 'createdAt' | 'updatedAt';
type SortOrder = 'ascending' | 'descending';
type UserStatus = 'blocked' | 'unblocked' | 'all';
type EmailVerified = 'verified' | 'unverified' | 'all';

export class UserSearcn extends PaginationRequest {
  order_field?: OrderField;
  sort_order?: SortOrder;
  status?: UserStatus;
  role?: Roles;
  emailVerified?: EmailVerified;
}
