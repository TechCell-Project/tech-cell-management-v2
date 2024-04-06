import { Options } from '@/components/common/form-handle';
import { Roles } from './enum';

export const CHANGE_ROLE_OPTIONS: Options<string>[] = [
  {
    label: 'Nhân viên bán hàng',
    value: Roles.Sales,
  },
  {
    label: 'Nhân viên kho',
    value: Roles.Warehouse,
  },
  {
    label: 'Nhân viên nhập liệu',
    value: Roles.DataEntry,
  },
  {
    label: 'Kế toán',
    value: Roles.Accountant,
  },
];
