import { Timestamp } from '@/common/model';
import { AttributeInProductSchema, SPU, SPUModelSchema, SPUStatusEnum } from '@techcell/node-sdk';

export class Spu extends Timestamp implements SPU {
  _id: string = '';
  brandId = '';
  slug = '';
  name = '';
  commonAttributes: AttributeInProductSchema[] = [];
  models: SPUModelSchema[] = [];
  status = SPUStatusEnum.Available;
  description?: string;
}
