import { Address } from '@/modules/address/models';

export class ProfileUpdateAddress {
  address: Address[] = [];

  constructor(values: Address[]) {
    if (values.length > 0) {
      Object.assign(this, { address: values });
    }
  }
}
