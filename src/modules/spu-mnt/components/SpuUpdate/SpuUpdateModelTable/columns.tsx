import Image from 'next/image';

import { SPUModelSchemaDto } from '@techcell/node-sdk';
import { ColumnDef } from '@tanstack/react-table';

import { SpuUpdateModel } from '../SpuUpdateModel';

export const columns: ColumnDef<SPUModelSchemaDto>[] = [
  {
    id: 'images',
    header: 'Ảnh',
    cell: ({ row }) => {
      const src = row.original.images?.find((image) => image.isThumbnail);
      console.log(row.original);

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
    cell: ({ row }) => <SpuUpdateModel model={row.original} trigger="Cập nhật" />,
  },
];
