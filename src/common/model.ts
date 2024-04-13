import { PriceSchema } from '@techcell/node-sdk';

export class Timestamp {
  createdAt: string = '';
  updatedAt: string = '';
}

export class ImageObj {
  publicId = '';
  url = '';
  isThumbnail?: boolean;
}

export class PaginationResponse<T> {
  data: T[] = [];
  hasNextPage: boolean = false;
}

export class PaginationRequest {
  page: number = 1;
  limit: number = 10;
}

export class SearchRequest extends PaginationRequest {
  filters?: string;
  sorts?: string;

  constructor(page: number, limit: number) {
    super();
    this.page = page || 1;
    this.limit = limit || 10;
  }
}

export class Price implements PriceSchema {
  base = 0;
  special = 0;
}
