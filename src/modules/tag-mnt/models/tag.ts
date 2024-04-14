import { Timestamp } from '@/common/model';
import { Tag as TagDto, TagStatusEnum } from '@techcell/node-sdk';

export class Tag extends Timestamp implements TagDto {
  _id: string = '';
  slug = '';
  name = '';
  description = '';
  status = TagStatusEnum.Active;
}
