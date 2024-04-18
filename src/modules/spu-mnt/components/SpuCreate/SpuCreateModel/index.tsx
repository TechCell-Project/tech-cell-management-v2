import { Fragment, ReactNode, memo, useState } from 'react';
import { UseFieldArrayAppend, useFieldArray, useForm } from 'react-hook-form';
import { AttributeDynamic, SpuCreatNew } from '~spu-mnt/models';
import { DialogDisplay } from '@/components/common/display';
import { SelectInput, TextInput } from '@/components/common/form-handle';
import { SPUModelSchemaDto } from '@techcell/node-sdk';
import { Button, Form, Separator } from '@/components/ui';
import { Attribute } from '@/modules/attribute-mnt/models';
import { PaginationResponse } from '@/common/model';
import { X } from 'lucide-react';
import SpuCreateModelImage from './SpuCreateModelImage';
import { convertSlugify } from '@/utilities/func.util';
import { RichTextInput } from '@/components/common/form-handle/RichTextInput';

type SpuCreateModelProps = {
  trigger: ReactNode;
  append: UseFieldArrayAppend<SpuCreatNew, 'models'>;
  listAttribute?: PaginationResponse<Attribute>;
};

const SpuCreateModel = memo(({ trigger, append, listAttribute }: SpuCreateModelProps) => {
  const createSpuModelForm = useForm<SPUModelSchemaDto>({
    defaultValues: {
      name: '',
      slug: '',
      images: [],
      attributes: [],
      description: '',
    },
  });
  const [open, setOpen] = useState<boolean>(false);

  const {
    handleSubmit,
    formState: { isSubmitting },
    watch,
    control,
    setValue,
    reset,
  } = createSpuModelForm;

  const {
    fields: fieldsAttr,
    remove: removeAttr,
    append: appendAttr,
  } = useFieldArray({
    control,
    name: 'attributes',
  });

  return (
    <DialogDisplay
      trigger={trigger}
      title="Thêm mới mẫu"
      open={open}
      setOpen={setOpen}
      classContent="max-w-6xl"
    >
      <Form {...createSpuModelForm}>
        <form
          onSubmit={handleSubmit((data) => {
            append({ ...data, slug: convertSlugify(data.name, '-') });
            reset();
            setOpen(false);
          })}
        >
          <h3 className="mt-5 mb-3 text-[16px] font-semibold">Ảnh</h3>
          <Separator className="my-4" />
          <SpuCreateModelImage />

          <h3 className="mt-5 mb-3 text-[16px] font-semibold">Thông tin cơ bản</h3>
          <Separator className="my-4" />
          <div className="grid grid-cols-2 gap-x-5 gap-y-3 mt-3">
            <TextInput<SPUModelSchemaDto> label="Tên mẫu" name="name" isDebounce />
            <RichTextInput<SPUModelSchemaDto> label="Mô tả" name="description" />
          </div>

          <h3 className="mt-5 mb-3 text-[16px] font-semibold">Thông số</h3>
          <Separator className="my-4" />
          <div>
            <div className="grid grid-cols-4 gap-x-5 gap-y-2 items-end">
              {fieldsAttr.map((field, index) => (
                <Fragment key={field.id}>
                  <SelectInput<SPUModelSchemaDto>
                    label="Thông số"
                    name={`attributes.${index}.k`}
                    options={listAttribute?.data ?? []}
                    typeOption="custom"
                    displayLabel="name"
                    isObjectValue
                    onChange={(value) => {
                      const option: Attribute = JSON.parse(value);
                      setValue(`attributes.${index}.k`, option.label);
                      setValue(`attributes.${index}.name`, option.name);
                      setValue(`attributes.${index}.u`, option.unit);
                    }}
                  />
                  <TextInput<SPUModelSchemaDto>
                    label="Giá trị"
                    name={`attributes.${index}.v`}
                    isDebounce
                  />
                  <TextInput<SPUModelSchemaDto>
                    label="Đơn vị"
                    name={`attributes.${index}.u`}
                    inputAttributes={{
                      disabled: true,
                    }}
                  />
                  <Button variant="ghost" className="h-8 w-8 p-0" onClick={() => removeAttr(index)}>
                    <span className="sr-only">Open menu</span>
                    <X className="h-4 w-4" />
                  </Button>
                </Fragment>
              ))}
            </div>

            <Button
              className="mt-3"
              type='button'
              variant="redLight"
              onClick={(e) => {
                e.stopPropagation();
                appendAttr(new AttributeDynamic());
              }}
            >
              Thêm thông số
            </Button>
          </div>

          <div className="w-full flex justify-end gap-4 mt-7">
            <Button variant="ghost" type="button" onClick={() => setOpen(false)}>
              Quay lại
            </Button>
            <Button type="submit" variant="red" isLoading={isSubmitting}>
              Xác nhận
            </Button>
          </div>
        </form>
      </Form>
    </DialogDisplay>
  );
});

SpuCreateModel.displayName = SpuCreateModel.name;

export default SpuCreateModel;
