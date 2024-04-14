import { CreateTagDto, CreateTagDtoStatusEnum } from '@techcell/node-sdk';

export class TagCreateNew implements CreateTagDto {
  name = '';
  description = '';
  status?: CreateTagDtoStatusEnum;
}
