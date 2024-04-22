import { memo } from 'react';
import { DataTable } from '@/components/common/data-table';
import { columns } from './columns';
import { useSpuStore } from '@/modules/spu-mnt/store';
import { SPUModelSchema } from '@techcell/node-sdk';
import SpuUpdateAddModel from '../SpuUpdateAddModel';
import { Button } from '@/components/ui';

const SpuUpdateModelTable = memo(() => {
  const { spu } = useSpuStore();

  return (
    <>
      <h3 className="mb-3 font-semibold">Mẫu</h3>
      <DataTable
        columns={columns}
        data={spu?.models as SPUModelSchema[]}
        isShowPagination={false}
      />
      <SpuUpdateAddModel
        trigger={
          <Button type="button" className="mt-4" variant="redLight">
            Thêm mẫu
          </Button>
        }
      />
    </>
  );
});

SpuUpdateModelTable.displayName = SpuUpdateModelTable.name;

export default SpuUpdateModelTable;
