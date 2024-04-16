import { PaginationResponse } from '@/common/model';
import { Brand } from '~brand-mnt/models';
import { memo } from 'react';
import { SelectInput, TextInput, TextareaInput } from '@/components/common/form-handle';
import { SpuCreatNew } from '~spu-mnt/models';
import { OPTIONS_STATUS_3 } from '@/constants/options';

const SpuCreateInfo = memo(({ listBrand }: { listBrand?: PaginationResponse<Brand> }) => {
  return (
    <>
      <h3 className="mb-2 font-semibold">Thông tin</h3>
      <div className="grid grid-cols-3 gap-x-5 gap-y-3">
        <SelectInput<SpuCreatNew>
          label="Thương hiệu"
          name="brandId"
          options={listBrand?.data ?? []}
          typeOption="custom"
        />
        <TextInput<SpuCreatNew> label="Tên" name="name" isDebounce />
        <SelectInput<SpuCreatNew> label="Trạng thái" name="status" options={OPTIONS_STATUS_3} />
        <TextareaInput<SpuCreatNew> label="Mô tả" name="description" isDebounce />
      </div>
    </>
  );
});

SpuCreateInfo.displayName = SpuCreateInfo.name;

export default SpuCreateInfo;
