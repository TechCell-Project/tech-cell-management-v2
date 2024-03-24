'use client';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui';
import { ReactNode } from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';

/**
 * OTPInputProps defines the props for the OTPInput component.
 * 
 * @template T - Type extending FieldValues for the control.
 * @property {FieldPath<T>} name - The name/path of the field in the form.
 * @property {string} label - The label for the OTP input field.
 * @property {Control<T, any>} control - The control object provided by React Hook Form.
 * @property {string | ReactNode} [description] - Optional description or additional information for the input field.
 * @property {string} [className] - Optional class name for styling purposes.
 */
type OTPInputProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label: string;
  control: Control<T, any>;
  description?: string | ReactNode;
  className?: string;
};

/**
 * OTPInput is a component used for rendering an OTP (One-Time Password) input field.
 * It integrates with React Hook Form for form management.
 * 
 * @template T - Type extending FieldValues for the control.
 * @param {OTPInputProps<T>} props - Props object for the OTPInput component.
 * @returns {JSX.Element} - Returns the JSX element for the OTP input field.
 */
export const OTPInput = <T extends FieldValues>({
  name,
  label,
  description,
  control,
  className,
}: OTPInputProps<T>): JSX.Element => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className={className}>
          <FormLabel className="text-[13px]">{label}</FormLabel>
          <FormControl>
            <InputOTP maxLength={6} {...field} className={`${error && 'border-[#ee4949]'}`}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage className="text-[13px]" />
        </FormItem>
      )}
    />
  );
};
