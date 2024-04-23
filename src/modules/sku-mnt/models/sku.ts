import { Price, Timestamp } from '@/common/model';
import { AttributeInProductSchema, ImageSchema, SKU, SKUStatusEnum } from '@techcell/node-sdk';

export class SkuImage implements ImageSchema {
  publicId = '';
  url = '';
  isThumbnail = false;
}

export class Sku extends Timestamp implements SKU {
  _id: string = '';
  name = '';
  spuId = '';
  spuModelSlug = '';
  price = new Price();
  image = new SkuImage();
  status = SKUStatusEnum.Selling;
  attributes: AttributeInProductSchema[] = [];
  categories: string[] = [];
  description?: string;
  tags: string[] = [];
}
