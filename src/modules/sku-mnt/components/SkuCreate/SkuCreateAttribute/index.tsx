import { Fragment, memo } from 'react';
import { Attribute } from '~attribute-mnt/models';
import { PaginationResponse } from '@/common/model';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { SkuCreateNew } from '~sku-mnt/models';
import { SelectInput, TextInput } from '@/components/common/form-handle';
import { Button } from '@/components/ui';
import { X } from 'lucide-react';
import { AttributeDynamic } from '@/modules/spu-mnt/models';

type SkuCreateAttributeProps = {
  listAttribute?: PaginationResponse<Attribute>;
};

const SkuCreateAttribute = ({ listAttribute }: SkuCreateAttributeProps) => {
  const { control, setValue } = useFormContext<SkuCreateNew>();

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'attributes',
  });

  return listAttribute && (
    <>
      <h3 className="mb-2 font-semibold">Thông số</h3>
      <div className="grid grid-cols-3 gap-x-5 gap-y-2 items-end">
        {fields.map((field, index) => (
          <Fragment key={field.id}>
            <SelectInput<SkuCreateNew>
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
            <TextInput<SkuCreateNew> label="Giá trị" name={`attributes.${index}.v`} isDebounce />
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
    </>
  );
};

export default memo(SkuCreateAttribute);
