import type { District, Province, Ward } from './address-location';

type AddressLocationLevel<T> = T | T[];
type AddressNameType = 'home' | 'office' | 'other';

export class Address {
  type: AddressNameType = 'home';
  customerName: string = '';
  phoneNumbers: string = '';
  provinceLevel: AddressLocationLevel<Province> = [];
  districtLevel: AddressLocationLevel<District> = [];
  wardLevel: AddressLocationLevel<Ward> = [];
  detail: string = '';
  isDefault: boolean = false;
}
