export class Timestamp {
  createdAt: string = '';
  updatedAt: string = '';
}

export class ImageObj {
  publicId: string = '';
  url: string = '';
  isThumbnail?: boolean = false;
}

export class PaginationResponse<T> {
  page: number = 0;
  pageSize: number = 0;
  totalPage: number = 0;
  totalRecord: number = 0;
  data: T[] = [];
}

export class PaginationRequest {
  page: number = 1;
  limit: number = 10;
  keyword?: string;
}
