import { UpdateBrandDto } from '@techcell/node-sdk';

export class BrandUpdate implements UpdateBrandDto {
  name = undefined;
  description = undefined;
  status = undefined;
}
