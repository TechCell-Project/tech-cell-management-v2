import { CreateAttributeDto } from '@techcell/node-sdk';

export class AttributeCreateNew implements CreateAttributeDto {
  label = '';
  name = '';
  unit?: string;
  description?: string;
}
