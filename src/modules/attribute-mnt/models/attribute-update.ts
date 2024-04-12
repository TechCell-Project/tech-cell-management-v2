import { UpdateAttributeDto, UpdateAttributeDtoStatusEnum } from '@techcell/node-sdk';

export class AttributeUpdate implements UpdateAttributeDto {
  name = '';
  description = '';
  status = UpdateAttributeDtoStatusEnum.Available;
}
