'use client';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { ReactNode, memo } from 'react';
import { FieldPath, FieldValues, useFormContext } from 'react-hook-form';
import { Options } from './form.type';

/**
 * SelectInputProps defines the props for the SelectInput component.
 *
 * @template TFieldValue - Type extending FieldValues for the control.
 * @property {FieldPath<TFieldValue>} name - The name/path of the field in the form.
 * @property {string} label - The label for the select input field.
 * @property {string | ReactNode} [description] - Optional description or additional information for the input field.
 * @property {string} [className] - Optional class name for styling purposes.
 * @property {Options[]} options - Array of options for the select input field.
 * @property {string} [placeholder] - Optional placeholder text for the select input.
 * @property {boolean} [disabled] - Optional disabled the select input.
 * @property {(value: string): string } [onChange] - Optional onchange function for the select input.
 */
type SelectInputProps<TFieldValue extends FieldValues> = {
  name: FieldPath<TFieldValue>;
  label: string;
  description?: string | ReactNode;
  className?: string;
  options: Options<string>[];
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
};

/**
 * SelectInput is a component used for rendering a select input field.
 * It integrates with React Hook Form for form management.
 *
 * @template TFieldValue - Type extending FieldValues for the control.
 * @param {SelectInputProps<TFieldValue>} props - Props object for the SelectInput component.
 * @returns {JSX.Element} - Returns the JSX element for the select input field.
 */
const SelectInput = <TFieldValue extends FieldValues>({
  name,
  label,
  description,
  className,
  options,
  placeholder = 'Chọn',
  disabled,
  onChange,
}: SelectInputProps<TFieldValue>): JSX.Element => {
  const { control } = useFormContext<TFieldValue>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className={className}>
          <FormLabel className="text-[13px]">{label}</FormLabel>
          <Select
            onValueChange={(e) => {
              onChange ? onChange(e) : field.onChange(e);
            }}
            defaultValue={field.value}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger className={`${error && 'border-[#ee4949]'}`}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className='overflow-y-auto max-h-[14rem]'>
              {options.map(({ label, value }) => (
                <SelectItem key={label} value={value} className="cursor-pointer">
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="text-[13px]" />
        </FormItem>
      )}
    />
  );
};

const MemoizedSelectInput = memo(SelectInput) as <T extends FieldValues>(
  props: SelectInputProps<T>,
) => JSX.Element;

export { MemoizedSelectInput as SelectInput };
