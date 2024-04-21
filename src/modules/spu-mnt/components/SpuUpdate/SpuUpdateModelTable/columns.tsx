import { DropdownDisplay } from '@/components/common/display';
import { Button } from '@/components/ui';
import { ColumnDef } from '@tanstack/react-table';
import { SPUModelSchemaDto } from '@techcell/node-sdk';
import { MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import SpuUpdateModel from '../SpuUpdateModel';

export const columns: ColumnDef<SPUModelSchemaDto>[] = [
  {
    id: 'images',
    header: 'Ảnh',
    cell: ({ row }) => {
      const src = row.original.images?.find((image) => image.isThumbnail);

      return src ? (
        <Image
          width={50}
          height={50}
          className="rounded-lg"
          src={(src as any)?.url}
          alt={`image-${row.index}`}
        />
      ) : (
        <p>Ảnh chưa cập nhật.</p>
      );
    },
  },
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
            content: <SpuUpdateModel model={row.original} trigger="Cập nhật" />,
            key: 'update-action',
            onClick: (e) => {
              e.preventDefault();
            },
          },
        ]}
      />
    ),
  },
];
