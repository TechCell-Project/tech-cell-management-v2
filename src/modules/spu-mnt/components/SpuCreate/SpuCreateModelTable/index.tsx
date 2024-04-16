import { SpuCreatNew } from '~spu-mnt/models';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { DataTable } from '@/components/common/data-table';
import { columns } from './columns';
import { Button } from '@/components/ui';

export const SpuCreateModelTable = () => {
  const { control } = useFormContext<SpuCreatNew>();

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'models',
  });

  return (
    <>
      <h3 className="mb-2 font-semibold">Mẫu</h3>
      <DataTable columns={columns} data={fields} isShowPagination={false}/>
      <Button className='mt-3'>Thêm mẫu</Button>
    </>
  );
};
