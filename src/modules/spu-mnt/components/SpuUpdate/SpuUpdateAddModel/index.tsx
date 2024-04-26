import { DialogDisplay } from '@/components/common/display';
import { Button, Form, Separator, useToast } from '@/components/ui';
import { SPUModelSchemaDto } from '@techcell/node-sdk';
import { Fragment, ReactNode, memo, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import SpuCreateModelImage from '../../SpuCreate/SpuCreateModel/SpuCreateModelImage';
import { RichTextInput, SelectInput, TextInput } from '@/components/common/form-handle';
import { useAttributeStore } from '~attribute-mnt/store';
import { X } from 'lucide-react';
import { AttributeDynamic, SpuModelCreate } from '~spu-mnt/models';
import { useSpuStore } from '~spu-mnt/store';
import { useMutation } from '@tanstack/react-query';
import { postOneSpuModelApi } from '@/modules/spu-mnt/apis';

type SpuUpdateAddModelProps = {
  trigger: ReactNode;
};

const SpuUpdateAddModel = memo(({ trigger }: SpuUpdateAddModelProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const { listAttribute } = useAttributeStore();
  const { spu } = useSpuStore();
  const { toast } = useToast();

  const createSpuModelForm = useForm<SPUModelSchemaDto>({
    defaultValues: {
      name: '',
      slug: '',
      images: [],
      attributes: [],
      description: '',
    },
  });

  const {
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting },
    control,
  } = createSpuModelForm;

  const {
    fields: fieldsAttr,
    remove: removeAttr,
    append: appendAttr,
  } = useFieldArray({
    control,
    name: 'attributes',
  });

  const { mutateAsync } = useMutation({
    mutationFn: (values: SpuModelCreate) => postOneSpuModelApi(spu?._id as string, values),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Thêm mới mẫu thành công!',
      });

      reset();
      setOpen(false);
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Thêm mới mẫu thất bại!',
        description: 'Vui lòng thử lại sau',
      });
    },
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
            const mapCommonAttr = data.attributes.map((attr) => {
              if (!attr.u) {
                delete attr.u;
              }
              return attr;
            });

            return mutateAsync({ models: [{ ...data, attributes: mapCommonAttr }] });
          })}
        >
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
            <div className="grid grid-cols-3 gap-x-5 gap-y-2 items-end">
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
                  />
                  {/* <TextInput<SPUModelSchemaDto>
                    label="Đơn vị"
                    name={`attributes.${index}.u`}
                    isDebounce
                  /> */}
                  <Button variant="ghost" className="h-8 w-8 p-0" onClick={() => removeAttr(index)}>
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
                e.preventDefault();
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

          <div className="w-full flex justify-end gap-4">
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

SpuUpdateAddModel.displayName = SpuUpdateAddModel.name;

export default SpuUpdateAddModel;
