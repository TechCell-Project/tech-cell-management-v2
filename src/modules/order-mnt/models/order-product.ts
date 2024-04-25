import { ImageObj } from '@/common/model';
import { PriceSchema, ProductSchema } from '@techcell/node-sdk';

export class OrderProduct implements ProductSchema {
  skuId = '';
  productName = '';
  productType = '';
  image = new ImageObj();
  serialNumber = [];
  unitPrice: PriceSchema = {
    base: 0,
    special: 0,
  };
  quantity = 0;
}
