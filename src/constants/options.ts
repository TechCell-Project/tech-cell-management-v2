import { Options } from '@/components/common/form-handle';
import { UserRoleEnum } from '@techcell/node-sdk';

export const SELECT_ROLE_OPTIONS: Options<string>[] = [
  {
    label: 'Nhân viên bán hàng',
    value: UserRoleEnum.Sales,
  },
  {
    label: 'Nhân viên kho',
    value: UserRoleEnum.Warehouse,
  },
  {
    label: 'Nhân viên nhập liệu',
    value: UserRoleEnum.DataEntry,
  },
  {
    label: 'Kế toán',
    value: UserRoleEnum.Accountant,
  },
];
