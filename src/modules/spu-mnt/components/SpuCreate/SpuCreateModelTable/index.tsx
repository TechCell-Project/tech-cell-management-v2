import { memo } from 'react';
import { SpuCreatNew } from '~spu-mnt/models';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { DataTable } from '@/components/common/data-table';
import { Button } from '@/components/ui';
import SpuCreateModel from '../SpuCreateModel';
import { PaginationResponse } from '@/common/model';
import { Attribute } from '@/modules/attribute-mnt/models';
import { columns } from './columns';

const SpuCreateModelTable = memo(
  ({ listAttribute }: { listAttribute?: PaginationResponse<Attribute> }) => {
    const { control } = useFormContext<SpuCreatNew>();

    const { fields, append, remove, update } = useFieldArray({
      control,
      name: 'models',
    });

    return (
      <>
        <h3 className="mb-3 font-semibold">Mẫu</h3>
        <DataTable
          columns={columns({ remove, update, listAttribute })}
          data={fields}
          isShowPagination={false}
        />
        <SpuCreateModel
          trigger={
            <Button type="button" className="mt-4" variant="redLight">
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
