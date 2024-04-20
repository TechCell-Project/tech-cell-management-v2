import { SpuCreatNew } from '~spu-mnt/models';
import { ColumnDef } from '@tanstack/react-table';
import { SPUModelSchemaDto } from '@techcell/node-sdk';
import { UseFieldArrayRemove, UseFieldArrayUpdate } from 'react-hook-form';
import SpuUpdateModel from '../SpuEditModel';
import { DropdownDisplay } from '@/components/common/display';
import { Button } from '@/components/ui';
import { MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import { Attribute } from '~attribute-mnt/models';
import { PaginationResponse } from '@/common/model';

type Columns = {
  remove: UseFieldArrayRemove;
  update: UseFieldArrayUpdate<SpuCreatNew, 'models'>;
  listAttribute?: PaginationResponse<Attribute>;
};

export const columns = ({
  remove,
  update,
  listAttribute,
}: Columns): ColumnDef<SPUModelSchemaDto>[] => {
  return [
    {
      id: 'images',
      header: 'Ảnh',
      cell: ({ row }) => {
        const src =
          row.original.images.find((image) => image.isThumbnail) ?? row.original.images[0];

        return (
          <Image
            width={50}
            height={50}
            className="rounded-lg"
            src={(src as any)?.url}
            alt={`image-${row.index}`}
          />
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
              key: 'delete-action',
              content: 'Xóa',
              onClick: () => remove(row.index),
            },
            {
              content: (
                <SpuUpdateModel
                  initValue={row.original}
                  trigger="Cập nhật"
                  indexModel={row.index}
                  update={update}
                  listAttribute={listAttribute}
                />
              ),
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
};
