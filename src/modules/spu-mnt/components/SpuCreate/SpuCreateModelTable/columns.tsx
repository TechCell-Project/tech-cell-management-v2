import { DropdownDisplay } from '@/components/common/display';
import { Button } from '@/components/ui';
import { ColumnDef } from '@tanstack/react-table';
import { SPUModelSchemaDto } from '@techcell/node-sdk';
import { MoreHorizontal } from 'lucide-react';

export const columns: ColumnDef<SPUModelSchemaDto>[] = [
  {
    accessorKey: 'name',
    header: 'Tên',
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
        items={[
          {
            content: 'Copy ID',
            key: 'copy-action',
            onClick: () => {
              // navigator.clipboard.writeText(row.original?._id);
            },
          },
        ]}
      />
    ),
  },
];
