import { AttributeInProductSchemaDto, UpdateSpuDto } from "@techcell/node-sdk";

export class SpuUpdate implements UpdateSpuDto {
  name = ''
  description = ''
  commonAttributes: AttributeInProductSchemaDto[]  = []
}