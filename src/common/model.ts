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
  data: T[] = [];
  hasNextPage: boolean = false
}

export class PaginationRequest {
  page: number = 1;
  limit: number = 10;
}
