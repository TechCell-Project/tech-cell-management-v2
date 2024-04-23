import { Price } from '@/common/model';
import { AttributeInProductSchema, CreateSkuDto, CreateSkuDtoStatusEnum } from '@techcell/node-sdk';

export class SkuCreateNew implements CreateSkuDto {
  name = '';
  spuId = '';
  spuModelSlug = '';
  price = new Price();
  status = CreateSkuDtoStatusEnum.Selling;
  attributes: AttributeInProductSchema[] = [];
  description?: string;
  categories?: string[];
  imagePublicId?: string;
  tags?: string[];
}
