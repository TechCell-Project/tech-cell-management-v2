'use client';

import {
  Checkbox,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui';
import { ReactNode } from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { Options } from './form.type';
import { CheckedState } from '@radix-ui/react-checkbox';

/**
 * CheckboxInputProps defines the props for the CheckboxInput component.
 *
 * @template TFieldValue - Type extending FieldValues for the control.
 * @property {FieldPath<TFieldValue>} name - The name/path of the field in the form.
 * @property {string} label - The label for the checkbox input field.
 * @property {Control<TFieldValue, any>} control - The control object provided by React Hook Form.
 * @property {string | ReactNode} [description] - Optional description or additional information for the input field.
 * @property {string} [className] - Optional class name for styling purposes.
 * @property {boolean} [disabled] - Optional boolean indicating whether the checkbox input is disabled.
 * @property {'boolean' | 'array'} [type='boolean'] - Optional type of checkbox input: 'boolean' (single checkbox) or 'array' (multiple checkboxes).
 * @property {Options[]} [options] - Optional array of options for multiple checkboxes (applicable when type is 'array').
 * @property {(checked: CheckedState) => void} [onChange] - Optional callback function to handle checkbox value changes.
 */
type CheckboxInputProps<TFieldValue extends FieldValues> = {
  name: FieldPath<TFieldValue>;
  label: string;
  control: Control<TFieldValue, any>;
  description?: string | ReactNode;
  className?: string;
  disabled?: boolean;
  type?: 'boolean' | 'array';
  options?: Options[];
  onChange?: (checked: CheckedState) => void;
};

/**
 * CheckboxInput is a component used for rendering a checkbox input field.
 * It integrates with React Hook Form for form management.
 *
 * @template TFieldValue - Type extending FieldValues for the control.
 * @param {CheckboxInputProps<TFieldValue>} props - Props object for the CheckboxInput component.
 * @returns {JSX.Element} - Returns the JSX element for the checkbox input field.
 */
export const CheckboxInput = <TFieldValue extends FieldValues>({
  name,
  label,
  control,
  description,
  className,
  disabled,
  type = 'boolean',
  options,
  onChange,
}: CheckboxInputProps<TFieldValue>): JSX.Element => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) =>
        type === 'boolean' ? (
          <FormItem className={`${className} flex flex-row items-start space-x-3 space-y-0`}>
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={(checked) => {
                  onChange ? onChange(checked) : field.onChange(checked);
                }}
                disabled={disabled}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>{label}</FormLabel>
              {description && <FormDescription>{description}</FormDescription>}
            </div>
          </FormItem>
        ) : (
          <FormItem className={className}>
            {options?.map((option) => (
              <FormField
                key={option.label}
                control={control}
                name={name}
                render={({ field }) => {
                  return (
                    <FormItem
                      key={option.label}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(option.label)}
                          onCheckedChange={(checked) => {
                            if (onChange) {
                              onChange(checked);
                            } else {
                              return checked
                                ? field.onChange([...field.value, option.label])
                                : field.onChange(
                                    field.value?.filter((value: string) => value !== option.label),
                                  );
                            }
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">{option.value}</FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
          </FormItem>
        )
      }
    />
  );
};
