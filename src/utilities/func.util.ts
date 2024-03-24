import { Roles } from '@/constants/enum';

export const getRoleViVN: { [key: string]: string } = {
  [Roles.Customer]: 'Khách hàng',
  [Roles.Staff]: 'Nhân viên',
  [Roles.Manager]: 'Quản lý',
  [Roles.Accountant]: 'Kế toán',
  [Roles.DataEntry]: 'Nhân viên nhập liệu',
  [Roles.Sales]: 'Nhân viên bán hàng',
  [Roles.Warehouse]: 'Nhân viên kho',
};

export const getSearchParams = <T extends { [key: string]: any }>(params: T): string => {
  const url = new URLSearchParams();

  Object.entries(params).map(([key, value]) => {
    if (!value) {
      return;
    }
    url.append(key, value as string);
  });

  return url.toString();
};
