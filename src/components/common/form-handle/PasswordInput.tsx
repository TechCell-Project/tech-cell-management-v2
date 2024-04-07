'use client';

import {
  Button,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { InputHTMLAttributes, ReactNode, useState } from 'react';
import { FieldPath, FieldValues, useFormContext } from 'react-hook-form';

/**
 * PasswordInputProps defines the props for the PasswordInput component.
 *
 * @template T - Type extending FieldValues for the control.
 * @property {FieldPath<T>} name - The name/path of the field in the form.
 * @property {string} label - The label for the text input field.
 * @property {string | ReactNode} [description] - Optional description or additional information for the input field.
 * @property {string} [className] - Optional class name for styling purposes.
 * @property {InputHTMLAttributes<HTMLInputElement>} [inputAttributes] - Optional additional attributes for the input element.
 */
type PasswordInputProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label: string;
  description?: string | ReactNode;
  className?: string;
  inputAttributes?: InputHTMLAttributes<HTMLInputElement>;
};

/**
 * PasswordInput is a component used for rendering a text password input field.
 * It integrates with React Hook Form for form management.
 *
 * @template T - Type extending FieldValues for the control.
 * @param {PasswordInputProps<T>} props - Props object for the PasswordInput component.
 * @returns {JSX.Element} - Returns the JSX element for the text password input field.
 */
export const PasswordInput = <T extends FieldValues>({
  name,
  label,
  description,
  className,
  inputAttributes,
}: PasswordInputProps<T>): JSX.Element => {
  const { control } = useFormContext<T>();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className={className}>
          <FormLabel className="text-[13px]">{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                {...inputAttributes}
                onChange={field.onChange}
                className={`${error && 'border-[#ee4949]'} hide-password-toggle`}
                type={showPassword ? 'text' : 'password'}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <EyeIcon className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                )}
                <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
              </Button>
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="text-[13px]" />
        </FormItem>
      )}
    />
  );
};
