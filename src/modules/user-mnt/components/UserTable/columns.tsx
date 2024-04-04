import { DropdownDisplay, DropdownDisplayItemProps } from '@/components/common/display';
import { Button } from '@/components/ui';
import { convertRoleViVN } from '@/utilities/convert.util';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import type { User } from '~user-mnt/models';

const actions: DropdownDisplayItemProps[] = [
  {
    content: 'Xem chi tiết',
    onClick: () => {},
  },
  {
    content: 'Chặn người dùng',
    onClick: () => {},
  },
];

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
          items={actions}
        />
      );
    },
  },
];
