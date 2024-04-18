import { SpuCreatNew } from '~spu-mnt/models';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { DataTable } from '@/components/common/data-table';
import { Button } from '@/components/ui';
import SpuCreateModel from '../SpuCreateModel';
import { memo, useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { SPUModelSchemaDto } from '@techcell/node-sdk';
import { DropdownDisplay } from '@/components/common/display';
import { MoreHorizontal } from 'lucide-react';
import { PaginationResponse } from '@/common/model';
import { Attribute } from '@/modules/attribute-mnt/models';

const SpuCreateModelTable = memo(
  ({ listAttribute }: { listAttribute?: PaginationResponse<Attribute> }) => {
    const { control } = useFormContext<SpuCreatNew>();

    const { fields, append, remove, update } = useFieldArray({
      control,
      name: 'models',
    });

    const columns: ColumnDef<SPUModelSchemaDto>[] = useMemo(() => {
      return [
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
              ]}
            />
          ),
        },
      ];
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <>
        <h3 className="mb-3 font-semibold">Mẫu</h3>
        <DataTable columns={columns} data={fields} isShowPagination={false} />
        <SpuCreateModel
          trigger={
            <Button className="mt-4" variant="redLight">
              Thêm mẫu
            </Button>
          }
          append={append}
          listAttribute={listAttribute}
        />
      </>
    );
  },
);

SpuCreateModelTable.displayName = SpuCreateModelTable.name;

export default SpuCreateModelTable;
