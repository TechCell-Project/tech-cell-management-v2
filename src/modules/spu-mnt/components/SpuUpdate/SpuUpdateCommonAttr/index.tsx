import { AttributeDynamic, Spu, SpuUpdate } from '~spu-mnt/models';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui';
import { X } from 'lucide-react';
import { SelectInput, TextInput } from '@/components/common/form-handle';
import { Fragment } from 'react';
import { PaginationResponse } from '@/common/model';
import { Attribute } from '~attribute-mnt/models';

type SpuUpdateCommonAttrProps = {
  listAttribute?: PaginationResponse<Attribute>;
  onSubmit: (values: Partial<SpuUpdate>) => void;
};

export const SpuUpdateCommonAttr = ({ listAttribute, onSubmit }: SpuUpdateCommonAttrProps) => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<Spu>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'commonAttributes',
  });

  return (
    <>
      <h3 className="mb-2 font-semibold">Thông số chung</h3>
      <div className="grid grid-cols-3 gap-x-5 gap-y-2 items-end">
        {fields.map((field, index) => (
          <Fragment key={field.id}>
            <SelectInput<SpuUpdate>
              label="Thông số"
              name={`commonAttributes.${index}.k`}
              options={listAttribute?.data ?? []}
              typeOption="custom"
              displayLabel="name"
              displayValue="label"
              onChange={(value) => {
                setValue(`commonAttributes.${index}.k`, value);
                const matchingOption = listAttribute?.data.find(
                  (attribute) => attribute.label === value,
                );
                if (matchingOption) {
                  setValue(`commonAttributes.${index}.name`, matchingOption.name);
                  setValue(`commonAttributes.${index}.u`, matchingOption.unit);
                  setValue(`commonAttributes.${index}.v`, '');
                }
              }}
            />
            <TextInput<SpuUpdate> label="Giá trị" name={`commonAttributes.${index}.v`} isDebounce />
            {/* <TextInput<SpuUpdate> label="Đơn vị" name={`commonAttributes.${index}.u`} isDebounce /> */}
            <Button
              variant="ghost"
              type="button"
              className="h-8 w-8 p-0"
              onClick={() => remove(index)}
            >
              <span className="sr-only">Open menu</span>
              <X className="h-4 w-4" />
            </Button>
          </Fragment>
        ))}
      </div>

      <Button
        className="mt-3"
        variant="redLight"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          append(new AttributeDynamic());
        }}
      >
        Thêm thông số
      </Button>

      <div className="w-full flex justify-end gap-4 mt-7">
        <Button
          type="button"
          variant="red"
          isLoading={isSubmitting}
          onClick={handleSubmit((data) => {
            const values: Partial<SpuUpdate> = { commonAttributes: data.commonAttributes };
            values.commonAttributes?.map((newValue) => {
              if (!newValue.u) {
                delete newValue.u;
              }
              return newValue;
            });
            onSubmit(values);
          })}
        >
          Xác nhận
        </Button>
      </div>
    </>
  );
};
