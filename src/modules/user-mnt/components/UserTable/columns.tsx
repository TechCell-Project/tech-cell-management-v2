import { DropdownDisplay } from '@/components/common/display';
import { convertRoleViVN } from '@/utilities/convert.util';
import { ColumnDef } from '@tanstack/react-table';
import type { User } from '~user-mnt/models';
import { Button } from '@/components/ui';
import { MoreHorizontal } from 'lucide-react';
import { getOneSessionStorage } from '@/utilities/session.util';
import { AuthLoginResponse } from '~auth/models';
import { columnsAction } from './columns-action';

const user = getOneSessionStorage<AuthLoginResponse>('user', 'object');

export const columns: ColumnDef<User>[] = [
  {
    id: 'name',
    header: 'Họ tên',
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    id: 'status',
    header: 'Trạng thái',
    accessorFn: (row) => (row?.block?.isBlocked ? 'Bị chặn' : 'Hoạt động'),
  },
  {
    id: 'role',
    header: 'Chức vụ',
    cell: ({ row }) => <>{convertRoleViVN[row.original.role]}</>,
  },
  {
    id: 'action',
    cell: ({ row }) => {
      const result = row.original;

      return (
        <DropdownDisplay
          trigger={
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          }
          label="Thao tác"
          items={columnsAction(result, (user as AuthLoginResponse).user._id)}
        />
      );
    },
  },
];
