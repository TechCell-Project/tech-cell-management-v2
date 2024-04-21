import dayjs from 'dayjs';
import { PaginationResponse } from '@/common/model';
import { SelectInput, TextInput, TextareaInput } from '@/components/common/form-handle';
import { OPTIONS_STATUS_3 } from '@/constants/options';
import { FORMAT_DATE } from '@/constants/utils';
import { Brand } from '@/modules/brand-mnt/models';
import { useSpuStore } from '@/modules/spu-mnt/store';

export const SpuUpdateInfo = ({ listBrand }: { listBrand?: PaginationResponse<Brand> }) => {
  const { spu } = useSpuStore();

  return (
    <>
      <h3 className="mb-2 font-semibold">Thông tin</h3>
      <div className="grid grid-cols-3 gap-x-5 gap-y-3">
        <TextInput
          label="ID"
          name="_id"
          inputAttributes={{
            disabled: true,
          }}
        />
        <TextInput
          label="Tạo"
          name="updatedAt"
          inputAttributes={{
            disabled: true,
          }}
          value={dayjs(spu?.updatedAt).format(FORMAT_DATE)}
        />
        <TextInput
          label="Cập nhật"
          name="createdAt"
          inputAttributes={{
            disabled: true,
          }}
          value={dayjs(spu?.createdAt).format(FORMAT_DATE)}
        />
        <SelectInput
          label="Thương hiệu"
          name="brandId"
          options={listBrand?.data ?? []}
          typeOption="custom"
          disabled
        />
        <SelectInput label="Trạng thái" name="status" options={OPTIONS_STATUS_3} disabled/>
        <TextInput label="Tên" name="name" isDebounce />
        <TextareaInput label="Mô tả" name="description" isDebounce />
      </div>
    </>
  );
};
