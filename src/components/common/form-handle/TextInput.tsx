'use client';

import { InputHTMLAttributes, ReactNode } from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui';

type TextInputProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label: string;
  control: Control<T, any>;
  description?: string | ReactNode;
  inputAttributes?: InputHTMLAttributes<HTMLInputElement>;
  className?: string;
};

/**
 * TextInput Component
 *
 * Renders a text input field within a form, integrated with react-hook-form library.
 *
 * @template T - Generics representing the field values for react-hook-form
 * @param {object} props - Props for TextInput component
 * @param {FieldPath<T>} props.name - The name/path of the input field in the form's data
 * @param {string} props.label - The label for the text input field
 * @param {string | ReactNode} [props.description] - Optional description or additional content to display below the input field
 * @param {Control<T, any>} props.control - The control object provided by react-hook-form to manage form inputs
 * @param {InputHTMLAttributes<HTMLInputElement>} props.inputAttributes - Additional attributes to be passed to the underlying HTML input element
 * @returns {JSX.Element} - Rendered TextInput component
 */
export const TextInput = <T extends FieldValues>({
  name,
  label,
  description,
  control,
  inputAttributes,
  className,
}: TextInputProps<T>): JSX.Element => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className="text-[13px]">{label}</FormLabel>
          <FormControl>
            <Input {...field} {...inputAttributes} />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage className="text-[13px]" />
        </FormItem>
      )}
    />
  );
};
