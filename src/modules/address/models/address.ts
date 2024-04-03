import { TypeAddress } from '@/constants/enum';
import type { District, Province, Ward } from './address-location';

type AddressLocationLevel<T> = T | T[];

export class Address {
  type: TypeAddress = TypeAddress.Home;
  customerName: string = '';
  phoneNumbers: string = '';
  provinceLevel: AddressLocationLevel<Province> = [];
  districtLevel: AddressLocationLevel<District> = [];
  wardLevel: AddressLocationLevel<Ward> = [];
  detail: string = '';
  isDefault: boolean = false;
}
