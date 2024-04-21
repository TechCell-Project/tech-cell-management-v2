import { Fragment, ReactNode, memo, useState } from 'react';
import { UseFieldArrayUpdate, useFieldArray, useForm } from 'react-hook-form';
import { PaginationResponse } from '@/common/model';
import { AttributeDynamic, SpuCreatNew } from '~spu-mnt/models';
import { Attribute } from '~attribute-mnt/models';
import { DialogDisplay } from '@/components/common/display';
import { SPUModelSchemaDto } from '@techcell/node-sdk';
import { Button, Form, Separator } from '@/components/ui';
import { convertSlugify } from '@/utilities/func.util';
import SpuCreateModelImage from '../SpuCreateModel/SpuCreateModelImage';
import { RichTextInput, SelectInput, TextInput } from '@/components/common/form-handle';
import { X } from 'lucide-react';

type SpuUpdateModelProps = {
  trigger: ReactNode;
  update: UseFieldArrayUpdate<SpuCreatNew, 'models'>;
  listAttribute?: PaginationResponse<Attribute>;
  initValue: SPUModelSchemaDto;
  indexModel: number;
};

const SpuEditModel = memo(
  ({ trigger, update, listAttribute, indexModel, initValue }: SpuUpdateModelProps) => {
    const [open, setOpen] = useState<boolean>(false);

    const updateSpuModelForm = useForm<SPUModelSchemaDto>({
      defaultValues: initValue,
    });

    const {
      handleSubmit,
      formState: { isSubmitting },
      control,
      setValue,
      reset,
    } = updateSpuModelForm;

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
        title="Cập nhật mẫu"
        open={open}
        setOpen={setOpen}
        classContent="max-w-6xl"
      >
        <Form {...updateSpuModelForm}>
          <form>
            <h3 className="mt-5 mb-3 text-[16px] font-semibold">Ảnh</h3>
            <Separator className="my-4" />
            <SpuCreateModelImage />

            <h3 className="mt-5 mb-3 text-[16px] font-semibold">Thông tin cơ bản</h3>
            <Separator className="my-4" />
            <div className="grid grid-cols-3 gap-x-5 gap-y-3 mt-3">
              <TextInput<SPUModelSchemaDto> label="Tên mẫu" name="name" isDebounce />
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
                      displayValue="label"
                      onChange={(value) => {
                        setValue(`attributes.${index}.k`, value);
                        const matchingOption = listAttribute?.data.find(
                          (attribute) => attribute.label === value,
                        );
                        if (matchingOption) {
                          setValue(`attributes.${index}.name`, matchingOption.name);
                          setValue(`attributes.${index}.u`, matchingOption.unit);
                          setValue(`attributes.${index}.v`, '');
                        }
                      }}
                    />
                    <TextInput<SPUModelSchemaDto>
                      label="Giá trị"
                      name={`attributes.${index}.v`}
                      isDebounce
                      isRealtimeTrigger
                    />
                    <TextInput<SPUModelSchemaDto>
                      label="Đơn vị"
                      name={`attributes.${index}.u`}
                      isDebounce
                      isRealtimeTrigger
                    />
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => removeAttr(index)}
                    >
                      <span className="sr-only">Open menu</span>
                      <X className="h-4 w-4" />
                    </Button>
                  </Fragment>
                ))}
              </div>

              <Button
                className="mt-3"
                type="button"
                variant="redLight"
                onClick={(e) => {
                  e.stopPropagation();
                  appendAttr(new AttributeDynamic());
                }}
              >
                Thêm thông số
              </Button>
            </div>

            <h3 className="mt-5 mb-3 text-[16px] font-semibold">Chi tiết</h3>
            <Separator className="my-4" />
            <div className="mt-3">
              <RichTextInput<SPUModelSchemaDto> label="Mô tả" name="description" />
            </div>

            <div className="w-full flex justify-end gap-4 mt-7">
              <Button
                variant="ghost"
                type="button"
                onClick={() => {
                  setOpen(false);
                  reset();
                }}
              >
                Quay lại
              </Button>
              <Button
                onClick={handleSubmit((data) => {
                  update(indexModel, { ...data, slug: convertSlugify(data.name, '-') });
                  reset();
                  setOpen(false);
                })}
                variant="red"
                isLoading={isSubmitting}
              >
                Xác nhận
              </Button>
            </div>
          </form>
        </Form>
      </DialogDisplay>
    );
  },
);

SpuEditModel.displayName = SpuEditModel.name;

export default SpuEditModel;
