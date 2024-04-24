import { PaginationResponse } from '@/common/model';
import { PriceInput, SelectInput, TextInput } from '@/components/common/form-handle';
import { OPTIONS_STATUS_4 } from '@/constants/options';
import { FORMAT_DATE } from '@/constants/utils';
import { Sku } from '@/modules/sku-mnt/models';
import { Spu } from '@/modules/spu-mnt/models';
import { SPUModelSchema, UpdateSkuDto } from '@techcell/node-sdk';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

type SkuUpdateInfoProps = {
  listSpu?: PaginationResponse<Spu>;
};

const SkuUpdateInfo = ({ listSpu }: SkuUpdateInfoProps) => {
  const [modelsOption, setModelsOption] = useState<SPUModelSchema[]>();

  const { setValue, watch } = useFormContext<Sku>();

  useEffect(() => {
    if (watch('spuId') && listSpu) {
      const matchedModel = listSpu.data.find((spu) => spu._id === watch('spuId'))?.models;
      if (matchedModel) {
        setModelsOption(matchedModel);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listSpu]);

  return (
    listSpu && (
      <>
        <h3 className="mb-2 font-semibold">Thông tin</h3>
        <div className="grid grid-cols-4 gap-x-5 gap-y-3">
          <TextInput<Sku> label="ID" name="_id" inputAttributes={{ disabled: true }} />
          <TextInput<Sku>
            label="TG tạo"
            name="createdAt"
            value={dayjs(watch('createdAt')).format(FORMAT_DATE)}
            inputAttributes={{ disabled: true }}
          />
          <TextInput<Sku>
            label="TG cập nhật"
            name="updatedAt"
            value={dayjs(watch('updatedAt')).format(FORMAT_DATE)}
            inputAttributes={{ disabled: true }}
          />
          <SelectInput<Sku>
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
            disabled
          />
          <SelectInput<Sku>
            label="Mẫu"
            name="spuModelSlug"
            options={modelsOption ?? []}
            typeOption="custom"
            displayValue="slug"
            disabled
          />
          <TextInput<Sku> label="Tên" name="name" isDebounce />
          <SelectInput<Sku> label="Trạng thái" name="status" options={OPTIONS_STATUS_4} />
          <PriceInput<Sku> label="Giá gốc (VNĐ)" name="price.base" />
          <PriceInput<Sku> label="Giá khuyến mãi (VNĐ)" name="price.special" />
        </div>
      </>
    )
  );
};

export default SkuUpdateInfo;
