import { PaginationRequest } from '@/common/model';

export class UserSearch extends PaginationRequest {
  filters?: string;
  sort?: string;

  constructor(page: number, limit: number) {
    super();
    this.page = page;
    this.limit = limit;
  }
}
