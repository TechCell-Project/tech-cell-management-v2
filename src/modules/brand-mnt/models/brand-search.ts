import { PaginationRequest } from '@/common/model';

export class BrandSearch extends PaginationRequest {
  // JSON.stringify type @FilterBrandsDto
  filters?: string;

  // JSON.stringify type @SortBrandsDto
  sorts?: string;

  constructor(page: number, limit: number, filters: string, sorts: string) {
    super();
    this.page = page;
    this.limit = limit;
    this.filters = filters;
    this.sorts = sorts;
  }
}
