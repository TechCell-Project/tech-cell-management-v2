import { ReactNode, memo, useState } from 'react';
import { UseFieldArrayAppend, useFieldArray, useForm } from 'react-hook-form';
import { SpuCreatNew } from '~spu-mnt/models';
import { DialogDisplay } from '@/components/common/display';
import { TextInput } from '@/components/common/form-handle';
import { SPUModelSchemaDto } from '@techcell/node-sdk';

type SpuCreateModelProps = {
  trigger: ReactNode;
  append: UseFieldArrayAppend<SpuCreatNew, 'models'>;
};

const SpuCreateModel = memo(({ trigger, append }: SpuCreateModelProps) => {
  const { control } = useForm<SPUModelSchemaDto>();
  const [open, setOpen] = useState<boolean>(false);

  const { fields: fieldsAttr } = useFieldArray({
    control,
    name: 'attributes',
  });

  return (
    <DialogDisplay
      trigger={trigger}
      title="Thêm mới mẫu"
      open={open}
      setOpen={setOpen}
      classContent="max-w-[48rem]"
    >
      <div className="grid grid-cols-3 gap-x-5 gap-y-3">
        <TextInput<SPUModelSchemaDto> label="Tên mẫu" name="name" isDebounce />
        <TextInput<SPUModelSchemaDto> label="Mô tả" name="description" isDebounce />
      </div>
    </DialogDisplay>
  );
});

SpuCreateModel.displayName = SpuCreateModel.name;

export default SpuCreateModel;
