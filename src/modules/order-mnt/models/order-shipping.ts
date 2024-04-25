import { ShippingSchema, ShippingSchemaProviderEnum } from '@techcell/node-sdk';
import { OrderLog } from './order-logs';

export class OrderShipping implements ShippingSchema {
  orderShipCode = '';
  provider = ShippingSchemaProviderEnum.Giaohangnhanh;
  fee = 0;
  expectedDeliveryTime = '';
  trackingLink = '';
  logs: Array<OrderLog> = new Array<OrderLog>();
}
