import { memo } from 'react';
import { DataTable } from '@/components/common/data-table';
import { columns } from './columns';
import { useSpuStore } from '@/modules/spu-mnt/store';
import { SPUModelSchema } from '@techcell/node-sdk';

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
      {/* <SpuCreateModel
          trigger={
            <Button type="button" className="mt-4" variant="redLight">
              Thêm mẫu
            </Button>
          }
          append={append}
          listAttribute={listAttribute}
        /> */}
    </>
  );
});

SpuUpdateModelTable.displayName = SpuUpdateModelTable.name;

export default SpuUpdateModelTable;
