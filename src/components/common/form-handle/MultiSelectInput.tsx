'use client';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  MultiSelect,
} from '@/components/ui';
import { FieldPath, FieldValues, useFormContext } from 'react-hook-form';

type MultiSelectInputProps<T extends FieldValues, TOption extends FieldValues> = {
  name: FieldPath<T>;
  label: string;
  className?: string;
  options: TOption[];
  displayValue?: keyof TOption | string;
  displayLabel?: keyof TOption | string;
  displayType?: 'items' | 'list';
  elementLimit?: number;
  description?: string;
};

export const MultiSelectInput = <T extends FieldValues, TOption extends FieldValues>({
  name,
  label,
  className,
  options,
  displayLabel,
  displayValue,
  displayType,
  elementLimit,
  description,
}: MultiSelectInputProps<T, TOption>) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className="text-[13px]">{label}</FormLabel>
          <FormControl>
            <MultiSelect
              {...field}
              selected={field.value}
              options={options}
              displayLabel={displayLabel as string}
              displayValue={displayValue as string}
              displayType={displayType}
              elementLimit={elementLimit}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="text-[13px]" />
        </FormItem>
      )}
    />
  );
};
