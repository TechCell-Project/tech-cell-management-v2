import { CreateBrandDto, CreateBrandDtoStatusEnum } from '@techcell/node-sdk';

export class BrandCreateNew implements CreateBrandDto {
  slug = '';
  name = '';
  description = '';
  status? = CreateBrandDtoStatusEnum.Inactive;
}
