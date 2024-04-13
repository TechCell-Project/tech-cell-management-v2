import { AddSpuModelDto, SPUModelSchemaDto } from '@techcell/node-sdk';

export class SpuModelCreate implements AddSpuModelDto {
  models: SPUModelSchemaDto[] = [];
}
