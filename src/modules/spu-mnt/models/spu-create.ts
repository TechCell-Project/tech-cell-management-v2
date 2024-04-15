import {
  AttributeInProductSchemaDto,
  CreateSpuDto,
  CreateSpuDtoStatusEnum,
  SPUModelSchemaDto,
} from '@techcell/node-sdk';

export class SpuCreatNew implements CreateSpuDto {
  brandId = '';
  name = '';
  description = '';
  commonAttributes: AttributeInProductSchemaDto[] = [];
  models: SPUModelSchemaDto[] = [];
  status?: CreateSpuDtoStatusEnum;
}

export class AttributeDynamic implements AttributeInProductSchemaDto {
  name = '';
  k = '';
  v = '';
  u = '';
}
