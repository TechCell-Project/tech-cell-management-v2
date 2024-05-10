'use client';

import { Fragment, memo } from 'react';

import { Button, Form, Separator, useToast } from '@/components/ui';
import { RichTextInput, SelectInput, TextInput } from '@/components/common/form-handle';

import { useFieldArray, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useSpuStore } from '~spu-mnt/store';

import { AttributeDynamic, SpuModelCreate, SpuModelUpdate } from '@/modules/spu-mnt/models';
import { patchOneSpuModelApi, postOneSpuModelApi } from '@/modules/spu-mnt/apis';
import { useAttributeStore } from '@/modules/attribute-mnt/store';

import SpuCreateModelImage from '../../SpuCreate/SpuCreateModel/SpuCreateModelImage';
import { convertSlugify, getFieldChanges } from '@/utilities/func.util';
import { SPUModelSchemaDto } from '@techcell/node-sdk';
import { X } from 'lucide-react';

interface SpuModelCreateUpdateForm {
  model: SPUModelSchemaDto | null;
  handleCloseModal: () => void;
}

export const ModelCreateUpdateForm = memo(
  ({ model, handleCloseModal }: Readonly<SpuModelCreateUpdateForm>) => {
    const { spu } = useSpuStore();
    const { toast } = useToast();

    const updateSpuModelForm = useForm<SPUModelSchemaDto>({
      mode: 'onChange',
      defaultValues: model ?? {
        name: '',
        slug: '',
        images: [],
        attributes: [],
        description: '',
      },
    });

    const { listAttribute } = useAttributeStore();

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

    const { mutateAsync } = useMutation({
      mutationFn: (values: Partial<SpuModelUpdate> | SpuModelCreate) => {
        if (model) {
          return patchOneSpuModelApi(
            spu?._id as string,
            spu?.slug as string,
            values as Partial<SpuModelUpdate>,
          );
        }
        return postOneSpuModelApi(spu?._id as string, values as SpuModelCreate);
      },
      onSuccess: () => {
        toast({
          variant: 'success',
          title: model ? 'Cập nhật' : 'Thêm' + ' mẫu thành công!',
        });

        reset();
        handleCloseModal();
      },
      onError: () => {
        toast({
          variant: 'destructive',
          title: model ? 'Cập nhật' : 'Thêm' + ' mẫu thất bại!',
          description: 'Vui lòng thử lại sau',
        });
      },
    });
    return (
      <Form {...updateSpuModelForm}>
        <form
          onSubmit={handleSubmit((data) => {
            const mapCommonAttr = data.attributes.map((attr) => {
              if (!attr.u) {
                delete attr.u;
              }
              return attr;
            });
            return mutateAsync({
              models: [
                { ...data, attributes: mapCommonAttr, slug: convertSlugify(data.name, '-') },
              ],
            });
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
            <div className="flex flex-col gap-3">
              {fieldsAttr.map((field, index) => (
                <div key={field.id} className="w-full flex gap-x-5 gap-y-2 items-end">
                  <SelectInput<SPUModelSchemaDto>
                    className="w-2/5"
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
                    className="w-2/5"
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
                </div>
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
            <Button variant="ghost" type="button" onClick={handleCloseModal}>
              Quay lại
            </Button>
            <Button
              type='submit'
              variant="red"
              isLoading={isSubmitting}
            >
              Xác nhận
            </Button>
          </div>
        </form>
      </Form>
    );
  },
);

ModelCreateUpdateForm.displayName = ModelCreateUpdateForm.name;
