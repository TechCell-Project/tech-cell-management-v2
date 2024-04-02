class CommonAddress {
  name_extension: string[] = [];
  status: '1' | '2' = '1';
}

export class Province extends CommonAddress {
  province_id: number = 0;
  province_name: string = '';
  country_id: string = '';
}

export class District extends CommonAddress {
  province_id: number = 0;
  district_id: number = 0;
  district_name: string = '';
  support_type: '0' | '1' | '2' | '3' = '1';
  can_update_cod: boolean = true;
}

export class Ward extends CommonAddress {
  district_id: number = 0;
  ward_code: string = '';
  ward_name: string = '';
  support_type: '0' | '1' | '2' | '3' = '1';
  can_update_cod: boolean = true;
}
