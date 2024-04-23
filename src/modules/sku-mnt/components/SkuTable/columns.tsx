import { ColumnDef } from '@tanstack/react-table';
import { Sku } from '../../models';
import { DropdownDisplay } from '@/components/common/display';
import { Button } from '@/components/ui';
import { MoreHorizontal } from 'lucide-react';
import { columnsAction } from './columns-action';
import { formatWithCommas } from '@/utilities/func.util';
import Image from 'next/image';

export const columns: ColumnDef<Sku>[] = [
  {
    id: 'images',
    header: 'Ảnh',
    cell: ({ row }) => {
      if (row.original.image) {
        return (
          <Image
            width={50}
            height={50}
            className="rounded-lg"
            src={row.original.image.url}
            alt={`image-${row.index}`}
          />
        );
      }
      return <>Ảnh chưa cập nhật.</>;
    },
  },
  {
    accessorKey: 'name',
    header: 'Tên',
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
  },
  {
    id: 'price',
    header: 'Giá gốc',
    accessorFn: (row) => formatWithCommas(row.price.base),
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
