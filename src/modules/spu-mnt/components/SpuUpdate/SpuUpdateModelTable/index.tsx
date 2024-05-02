import { memo } from 'react';
import { DataTable } from '@/components/common/data-table';
import { columns } from './columns';
import { useSpuStore } from '@/modules/spu-mnt/store';
import { SPUModelSchema } from '@techcell/node-sdk';
import { Button } from '@/components/ui';
import SpuModelCreateUpdateModal from '../SpuUpdateModel/model-create-update-dialog';
import { useSpuModelUpdateModal } from '@/modules/spu-mnt/hooks/useSpuModelUpdateModal';

const SpuUpdateModelTable = memo(() => {
  const { spu } = useSpuStore();
  const { setModel, onOpen } = useSpuModelUpdateModal();

  const openAddModel = () => {
    setModel(null);
    onOpen();
  };

  return (
    <>
      <h3 className="mb-3 font-semibold">Mẫu</h3>
      <DataTable
        columns={columns}
        data={spu?.models as SPUModelSchema[]}
        isShowPagination={false}
      />
      <Button type="button" className="mt-4" variant="redLight" onClick={openAddModel}>
        Thêm mẫu
      </Button>
      <SpuModelCreateUpdateModal />
    </>
  );
});

SpuUpdateModelTable.displayName = SpuUpdateModelTable.name;

export default SpuUpdateModelTable;
