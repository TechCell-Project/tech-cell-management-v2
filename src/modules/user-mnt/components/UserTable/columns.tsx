import { convertRoleViVN } from '@/utilities/convert.util';
import { ColumnDef } from '@tanstack/react-table';
import type { User } from '~user-mnt/models';

export const columns: ColumnDef<User>[] = [
  {
    id: 'name',
    header: 'Họ tên',
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
  },
  {
    accessorKey: 'userName',
    header: 'Tên người dùng',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    id: 'role',
    header: 'Chức vụ',
    cell: (props) => <>{convertRoleViVN[props.row.original.role]}</>,
  },
];
