import { ColumnDef } from '@tanstack/react-table';
import { Attribute } from '../../models';
import { capitallize } from '@/utilities/func.util';
import { DropdownDisplay } from '@/components/common/display';
import { Button } from '@/components/ui';
import { MoreHorizontal } from 'lucide-react';
import { columnsAction } from './columns-action';

export const columns: ColumnDef<Attribute>[] = [
  {
    accessorKey: 'name',
    header: 'Tên thông số',
  },
  {
    id: 'unit',
    header: 'Đơn vị',
    accessorFn: (row) => row?.unit ?? '',
  },
  {
    accessorKey: 'description',
    header: 'Mô tả',
    size: 500,
  },
  {
    id: 'status',
    header: 'Trạng thái',
    accessorFn: (row) => capitallize(row.status),
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
        items={columnsAction(row.original)}
      />
    ),
  },
];
