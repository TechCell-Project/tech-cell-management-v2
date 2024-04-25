import { OrderLogSchema } from '@techcell/node-sdk';

export class OrderLog implements OrderLogSchema {
  actorId = '';
  action = '';
  note = '';
}
