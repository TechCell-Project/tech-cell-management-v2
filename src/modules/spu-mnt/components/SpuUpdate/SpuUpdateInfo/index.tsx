import dayjs from 'dayjs';
import { PaginationResponse } from '@/common/model';
import { SelectInput, TextInput, TextareaInput } from '@/components/common/form-handle';
import { OPTIONS_STATUS_3 } from '@/constants/options';
import { FORMAT_DATE } from '@/constants/utils';
import { Brand } from '~brand-mnt/models';
import { useSpuStore } from '~spu-mnt/store';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui';
import { Spu, SpuUpdate } from '~spu-mnt/models';
import { getFieldChanges } from '@/utilities/func.util';

type SpuUpdateInfoProps = {
  listBrand?: PaginationResponse<Brand>;
  onSubmit: (values: Partial<SpuUpdate>) => void;
};

export const SpuUpdateInfo = ({ listBrand, onSubmit }: SpuUpdateInfoProps) => {
  const { spu } = useSpuStore();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<Spu>();

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
        <SelectInput label="Trạng thái" name="status" options={OPTIONS_STATUS_3} disabled />
        <TextInput label="Tên" name="name" isDebounce />
        <TextareaInput label="Mô tả" name="description" isDebounce />
      </div>
      <div className="w-full flex justify-end gap-4 mt-7">
        <Button
          type="button"
          variant="red"
          isLoading={isSubmitting}
          onClick={handleSubmit((data) => {
            const values: Partial<SpuUpdate> = { name: data.name, description: data.description };
            onSubmit(getFieldChanges(values, spu as Spu));
          })}
        >
          Xác nhận
        </Button>
      </div>
    </>
  );
};
