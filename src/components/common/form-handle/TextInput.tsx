'use client';

import { InputHTMLAttributes, ReactNode, useState } from 'react';
import {
  Control,
  FieldPath,
  FieldValues,
  UseFormGetValues,
  UseFormSetValue,
} from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui';

/**
 * TextInputProps defines the props for the TextInput component.
 * @template T - Type extending FieldValues for the control.
 * @property {FieldPath<T>} name - The name/path of the field in the form.
 * @property {string} label - The label for the text input field.
 * @property {string | ReactNode} [description] - Optional description or additional information for the input field.
 * @property {string} [className] - Optional class name for styling purposes.
 * @property {InputHTMLAttributes<HTMLInputElement>} [inputAttributes] - Optional additional attributes for the input element.
 * @property {{ getValues: UseFormGetValues<T>; setValue: UseFormSetValue<T>; control: Control<T, any>; }} formReturn - Object containing necessary form control functions and properties.
 * @property {boolean} [isDebounce] - Optional boolean indicating whether debouncing is enabled for input value changes.
 */
type TextInputProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label: string;
  description?: string | ReactNode;
  className?: string;
  inputAttributes?: InputHTMLAttributes<HTMLInputElement>;
  formReturn: {
    getValues: UseFormGetValues<T>;
    setValue: UseFormSetValue<T>;
    control: Control<T, any>;
  };
  isDebounce?: boolean;
};

/**
 * TextInput is a component used for rendering a text input field.
 * It integrates with React Hook Form for form management.
 * @template T - Type extending FieldValues for the control.
 * @param {TextInputProps<T>} props - Props object for the TextInput component.
 * @returns {JSX.Element} - Returns the JSX element for the text input field.
 */
export const TextInput = <T extends FieldValues>({
  name,
  label,
  description,
  className,
  inputAttributes,
  formReturn,
  isDebounce,
}: TextInputProps<T>): JSX.Element => {
  const { getValues, setValue, control } = formReturn;

  const [initValue, setInitValue] = useState<string>(getValues(name) ?? '');
  const [time, setTime] = useState<any>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className={className}>
          <FormLabel className="text-[13px]">{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              {...inputAttributes}
              value={initValue}
              onChange={(e) => {
                setInitValue(e.target.value);
                if (isDebounce) {
                  clearTimeout(time);
                  setTime(setTimeout(() => setValue(name, e.target.value as any), 400));
                } else {
                  setValue(name, e.target.value as any);
                }
              }}
              className={`${error && 'border-[#ee4949]'}`}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage className="text-[13px]" />
        </FormItem>
      )}
    />
  );
};
