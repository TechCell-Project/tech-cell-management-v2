import { AddSerialNumberDto } from '@techcell/node-sdk';

export class SkuCreateSerialNum implements AddSerialNumberDto {
  serialNumbers: string[] = [''];
}
