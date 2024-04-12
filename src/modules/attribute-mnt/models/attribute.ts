import { Timestamp } from '@/common/model';
import { Attribute as AttributeDto, AttributeStatusEnum } from '@techcell/node-sdk';

export class Attribute extends Timestamp implements AttributeDto {
  _id: string = '';
  label = '';
  name = '';
  description = '';
  status = AttributeStatusEnum.Available;
  unit?: string;
}
