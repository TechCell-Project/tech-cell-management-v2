import { UpdateAttributeDto, UpdateAttributeDtoStatusEnum } from '@techcell/node-sdk';
import { Attribute } from './attribute';

export class AttributeUpdate implements UpdateAttributeDto {
  name = '';
  description = '';
  status: any = UpdateAttributeDtoStatusEnum.Available;

  constructor(attribute: Attribute) {
    this.name = attribute.name;
    this.description = attribute.description;
    this.status = attribute.status;
  }
}
