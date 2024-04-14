import { UpdateTagDto } from '@techcell/node-sdk';
import { Tag } from './tag';

export class TagUpdate implements UpdateTagDto {
  name = '';
  description = '';
  status?: any;

  constructor(tag: Tag) {
    this.name = tag.name;
    this.description = tag.description;
    this.status = tag.status;
  }
}
