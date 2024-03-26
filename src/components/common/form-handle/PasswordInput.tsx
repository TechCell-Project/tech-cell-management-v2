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
import { Control, FieldPath, FieldValues } from 'react-hook-form';

type PasswordInputProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label: string;
  control: Control<T, any>;
  description?: string | ReactNode;
  className?: string;
  inputAttributes?: InputHTMLAttributes<HTMLInputElement>;
};

export const PasswordInput = <T extends FieldValues>({
  name,
  label,
  control,
  description,
  className,
  inputAttributes,
}: PasswordInputProps<T>): JSX.Element => {
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
