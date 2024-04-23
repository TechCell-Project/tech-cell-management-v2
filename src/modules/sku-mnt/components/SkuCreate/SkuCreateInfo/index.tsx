import { PaginationResponse } from '@/common/model';
import { PriceInput, SelectInput, TextInput } from '@/components/common/form-handle';
import { OPTIONS_STATUS_4 } from '@/constants/options';
import { SkuCreateNew } from '@/modules/sku-mnt/models';
import { Spu } from '@/modules/spu-mnt/models';
import { SPUModelSchema } from '@techcell/node-sdk';
import { memo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

type SkuCreateInfoProps = {
  listSpu?: PaginationResponse<Spu>;
};

const SkuCreateInfo = ({ listSpu }: SkuCreateInfoProps) => {
  const [modelsOption, setModelsOption] = useState<SPUModelSchema[]>();

  const { setValue } = useFormContext<SkuCreateNew>();

  return (
    listSpu && (
      <>
        <h3 className="mb-2 font-semibold">Thông tin</h3>
        <div className="grid grid-cols-4 gap-x-5 gap-y-3">
          <SelectInput<SkuCreateNew>
            label="Series (dòng)"
            name="spuId"
            options={listSpu?.data ?? []}
            typeOption="custom"
            onChange={(value) => {
              setValue('spuId', value);

              const matchedModel = listSpu.data.find((spu) => spu._id === value)?.models;
              if (matchedModel) {
                setModelsOption(matchedModel);
              }
            }}
          />
          <SelectInput<SkuCreateNew>
            label="Mẫu"
            name="spuModelSlug"
            options={modelsOption ?? []}
            typeOption="custom"
            displayValue="slug"
          />
          <TextInput<SkuCreateNew> label="Tên" name="name" isDebounce />
          <SelectInput<SkuCreateNew> label="Trạng thái" name="status" options={OPTIONS_STATUS_4} />
          <PriceInput<SkuCreateNew> label="Giá gốc (VNĐ)" name="price.base" />
          <PriceInput<SkuCreateNew> label="Giá khuyến mãi (VNĐ)" name="price.special" />
        </div>
      </>
    )
  );
};

export default memo(SkuCreateInfo);
