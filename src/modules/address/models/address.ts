import {
  DistrictLevel,
  ProvinceLevel,
  UserAddressSchema,
  WardLevel,
} from '@techcell/node-sdk';

export class Address implements UserAddressSchema {
  type = '';
  customerName = '';
  phoneNumbers = '';
  provinceLevel: ProvinceLevel = {
    provinceId: 0,
    provinceName: '',
  };
  districtLevel: DistrictLevel = {
    districtId: 0,
    districtName: '',
  };
  wardLevel: WardLevel = {
    wardCode: '',
    wardName: '',
  };
  detail = '';
  isDefault = false;
}
