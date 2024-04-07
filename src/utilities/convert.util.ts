import { TypeAddress } from '@/constants/enum';
import { UserRoleEnum } from '@techcell/node-sdk';

export const convertRoleViVN: { [key: string]: string } = {
  [UserRoleEnum.Customer]: 'Khách hàng',
  [UserRoleEnum.Manager]: 'Quản lý',
  [UserRoleEnum.Accountant]: 'Kế toán',
  [UserRoleEnum.DataEntry]: 'Nhân viên nhập liệu',
  [UserRoleEnum.Sales]: 'Nhân viên bán hàng',
  [UserRoleEnum.Warehouse]: 'Nhân viên kho',
};

export const convertTypeAddress: { [key: string]: string } = {
  [TypeAddress.Home]: 'Nhà',
  [TypeAddress.Office]: 'Văn phòng/Công ty',
  [TypeAddress.Other]: 'Khác',
};
