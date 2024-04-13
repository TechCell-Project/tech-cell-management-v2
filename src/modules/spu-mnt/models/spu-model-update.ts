import {
  AttributeInProductSchemaDto,
  ImageSchemaDto,
  UpdateSPUModelSchemaDto,
} from '@techcell/node-sdk';

export class SpuModelUpdate implements UpdateSPUModelSchemaDto {
  name = '';
  description = '';
  images: ImageSchemaDto[] = [];
  attributes: AttributeInProductSchemaDto[] = [];
}
