'use client';

import {
  ChangeEventHandler,
  InputHTMLAttributes,
  ReactNode,
  memo,
  useState,
  useRef,
  useEffect,
} from 'react';
import { FieldPath, FieldValues, useFormContext } from 'react-hook-form';
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
 *
 * @template T - Type extending FieldValues for the control.
 * @property {FieldPath<T>} name - The name/path of the field in the form.
 * @property {string} label - The label for the text input field.
 * @property {string | ReactNode} [description] - Optional description or additional information for the input field.
 * @property {string} [className] - Optional class name for styling purposes.
 * @property {InputHTMLAttributes<HTMLInputElement>} [inputAttributes] - Optional additional attributes for the input element.
 * @property {boolean} [isDebounce] - Optional boolean indicating whether debouncing is enabled for input value changes.
 * @property {ChangeEventHandler<HTMLInputElement>} [onChange] - Optional onchange function for the text input.
 */
type TextInputProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label: string;
  description?: string | ReactNode;
  className?: string;
  inputAttributes?: InputHTMLAttributes<HTMLInputElement>;
  isDebounce?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  isRealtimeTrigger?: boolean;
  value?: string;
};

/**
 * TextInput is a component used for rendering a text input field.
 * It integrates with React Hook Form for form management.
 *
 * @template T - Type extending FieldValues for the control.
 * @param {TextInputProps<T>} props - Props object for the TextInput component.
 * @returns {JSX.Element} - Returns the JSX element for the text input field.
 */
const TextInput = <T extends FieldValues>({
  name,
  label,
  description,
  className,
  inputAttributes,
  isDebounce = false,
  onChange,
  isRealtimeTrigger = false,
  value
}: TextInputProps<T>): JSX.Element => {
  const { getValues, setValue, control, trigger, watch } = useFormContext<T>();
  const watchedValue = watch(name);

  const [initValue, setInitValue] = useState<string>(getValues(name) ?? '');
  const timeRef = useRef<NodeJS.Timeout>();

  // useEffect(() => {
  //   // Update initial value whenever default value changes
  //   setInitValue(watchedValue ?? '');
  // }, [watchedValue]);


  const handleChange: ChangeEventHandler<HTMLInputElement> =
    onChange ??
    (({ target }) => {
      setInitValue(target.value);

      if (isDebounce) {
        if (timeRef.current) clearTimeout(timeRef.current);
        timeRef.current = setTimeout(() => {
          setValue(name, target.value as any);
          trigger(name);
        }, 400);
      } else {
        setValue(name, target.value as any);
        trigger(name);
      }
    });

  useEffect(() => {
    if (isRealtimeTrigger) {
      const timeout = setTimeout(() => {
        setInitValue(isDebounce && !watchedValue ? '' : watchedValue || '');
      }, 400);

      return () => clearTimeout(timeout);
    }
  }, [watchedValue, isDebounce, isRealtimeTrigger]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className={className}>
          <FormLabel className="text-[13px]">{label}</FormLabel>
          <FormControl>
            {!isDebounce ? (
              <Input
                {...field}
                {...inputAttributes}
                value={value ?? field.value}
                onChange={(e) => (onChange ? onChange(e) : field.onChange(e))}
                className={`${error && 'border-[#ee4949]'}`}
              />
            ) : (
              <Input
                {...field}
                {...inputAttributes}
                value={initValue}
                onChange={handleChange}
                className={`${error && 'border-[#ee4949]'}`}
              />
            )}
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="text-[13px]" />
        </FormItem>
      )}
    />
  );
};

const MemoizedTextInput = memo(TextInput) as <T extends FieldValues>(
  props: TextInputProps<T>,
) => JSX.Element;

export { MemoizedTextInput as TextInput };
