import {
  PaymentSchema,
  PaymentSchemaMethodEnum,
  PaymentSchemaStatusEnum,
} from '@techcell/node-sdk';

export class OrderPayment implements PaymentSchema {
  method = PaymentSchemaMethodEnum.Cod;
  status = PaymentSchemaStatusEnum.Pending;
  url = '';
  paymentData?: object;
}
