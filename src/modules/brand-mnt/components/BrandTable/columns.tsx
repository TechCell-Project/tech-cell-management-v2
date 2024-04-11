import { DropdownDisplay } from '@/components/common/display';
import { Button } from '@/components/ui';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { columnsAction } from './columns-action';
import { Brand } from '../../models';
import { capitallize } from '@/utilities/func.util';

export const columns: ColumnDef<Brand>[] = [
  {
    accessorKey: 'name',
    header: 'Tên thương hiệu',
  },
  {
    accessorKey: 'description',
    header: 'Mô tả',
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
