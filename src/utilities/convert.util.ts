import { Roles, TypeAddress } from '@/constants/enum';

export const convertRoleViVN: { [key: string]: string } = {
  [Roles.Customer]: 'Khách hàng',
  [Roles.Manager]: 'Quản lý',
  [Roles.Accountant]: 'Kế toán',
  [Roles.DataEntry]: 'Nhân viên nhập liệu',
  [Roles.Sales]: 'Nhân viên bán hàng',
  [Roles.Warehouse]: 'Nhân viên kho',
};

export const convertTypeAddress: { [key: string]: string } = {
  [TypeAddress.Home]: 'Nhà',
  [TypeAddress.Office]: 'Văn phòng/Công ty',
  [TypeAddress.Other]: 'Khác',
};
