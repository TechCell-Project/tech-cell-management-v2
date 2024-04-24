import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Numeric,
} from '@/components/ui';
import { ReactNode } from 'react';
import { FieldPath, FieldValues, useFormContext } from 'react-hook-form';

type PriceInputProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label: string;
  description?: string | ReactNode;
  className?: string;
};

export const PriceInput = <T extends FieldValues>({
  name,
  label,
  description,
  className,
}: PriceInputProps<T>): JSX.Element => {
  const { control } = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className={className}>
          <FormLabel className="text-[13px]">{label}</FormLabel>
          <FormControl>
            <Numeric
              onChange={field.onChange}
              name={name}
              defaultValue={String(field.value)}
              className={`${error && 'border-[#ee4949]'}`}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="text-[13px]" />
        </FormItem>
      )}
    />
  );
};
