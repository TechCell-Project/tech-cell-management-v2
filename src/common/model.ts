import { AvatarSchema } from "@techcell/node-sdk";

export class Timestamp {
  createdAt: string = '';
  updatedAt: string = '';
}

export class ImageObj implements AvatarSchema {
  publicId = '';
  url = '';
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
