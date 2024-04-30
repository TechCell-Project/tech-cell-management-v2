import { AddSerialNumberDto } from '@techcell/node-sdk';

type SerialObj = { serial: string };

export class SkuCreateSerialObj {
  serialNumbers: SerialObj[] = [];
}

export class SkuCreateSerialNum implements AddSerialNumberDto {
  serialNumbers: string[] = [];
}
