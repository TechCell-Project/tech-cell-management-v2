import {
  DistrictLevel,
  ProvinceLevel,
  UserAddressSchema,
  UserAddressSchemaTypeEnum,
  WardLevel,
} from '@techcell/node-sdk';

export class Address implements UserAddressSchema {
  type: UserAddressSchemaTypeEnum = UserAddressSchemaTypeEnum.Home;
  customerName = '';
  phoneNumbers = '';
  provinceLevel: ProvinceLevel = {
    provinceId: 0,
  };
  districtLevel: DistrictLevel = {
    districtId: 0,
  };
  wardLevel: WardLevel = {
    wardCode: '',
  };
  detail = '';
  isDefault = false;
}
