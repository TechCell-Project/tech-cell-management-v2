import { DropdownDisplay, TooltipDisplay } from '@/components/common/display';
import { convertRoleViVN } from '@/utilities/convert.util';
import { ColumnDef } from '@tanstack/react-table';
import type { User } from '~user-mnt/models';
import { Button } from '@/components/ui';
import { CircleCheckBig, MoreHorizontal } from 'lucide-react';
import { AuthLoginResponse } from '~auth/models';
import { columnsAction } from './columns-action';
import { getOneLocalStorage } from '@/utilities/local';

const user = getOneLocalStorage<AuthLoginResponse>('user', 'object');

export const columns: ColumnDef<User>[] = [
  {
    id: 'name',
    header: 'Họ tên',
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
  },
  {
    id: 'email',
    header: 'Email',
    cell: ({ row }) => (
      <div className="flex justify-start items-center gap-2">
        {row.original.email}{' '}
        {row.original.emailVerified && (
          <TooltipDisplay
            trigger={<CircleCheckBig className="h-[1rem] w-[1rem]" color="#ee4949" />}
            content="Tài khoản đã xác nhận email"
          />
        )}
      </div>
    ),
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
    cell: ({ row }) => (
      <DropdownDisplay
        trigger={
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        }
        label="Thao tác"
        items={columnsAction(row.original, (user as AuthLoginResponse).user._id)}
      />
    ),
  },
];
