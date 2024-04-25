import { Address } from '~address/models';
import { CustomerSchema } from '@techcell/node-sdk';

export class OrderCustomer implements CustomerSchema {
  customerId = '';
  email = '';
  address = new Address();
}
