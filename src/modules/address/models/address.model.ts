import type { District, Province, Ward } from './address-location.model';

type AddressLocationLevel<T> = T | T[];

export class Address {
  addressName: string = '';
  customerName: string = '';
  phoneNumbers: string = '';
  provinceLevel: AddressLocationLevel<Province> = [];
  districtLevel: AddressLocationLevel<District> = [];
  wardLevel: AddressLocationLevel<Ward> = [];
  detail: string = '';
  isDefault: boolean = false;
}
