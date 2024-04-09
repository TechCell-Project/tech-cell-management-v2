import { UpdateBrandDto } from '@techcell/node-sdk';
import { Brand } from './brand';

export class BrandUpdate implements UpdateBrandDto {
  name = '';
  description = '';
  status: any = '';

  constructor(brand: Brand) {
    this.name = brand.name;
    this.description = brand.description;
    this.status = brand.status;
  }
}
