import { ColumnDef } from '@tanstack/react-table';
import { Spu } from '../../models';
import { capitallize } from '@/utilities/func.util';
import { DropdownDisplay } from '@/components/common/display';
import { Button } from '@/components/ui';
import { MoreHorizontal } from 'lucide-react';
import { columnsAction } from './columns-action';

export const columns: ColumnDef<Spu>[] = [
  {
    accessorKey: 'name',
    header: 'Tên'
  },
  {
    accessorKey: 'description',
    header: 'Mô tả'
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
