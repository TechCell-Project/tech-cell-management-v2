import { Timestamp } from '@/common/model';
import { Order as OrderDto, OrderOrderStatusEnum } from '@techcell/node-sdk';
import { OrderCustomer } from './order-customer';
import { OrderProduct } from './order-product';
import { OrderPayment } from './order-payment';
import { OrderShipping } from './order-shipping';
import { OrderLog } from './order-logs';

export class Order extends Timestamp implements OrderDto {
  _id: string = '';
  customer: OrderCustomer = new OrderCustomer();
  note?: string = '';
  products = new Array<OrderProduct>();
  payment = new OrderPayment();
  orderStatus = OrderOrderStatusEnum.Pending;
  shipping = new OrderShipping();
  orderLogs = new Array<OrderLog>();
  totalPrice = 0;
}
