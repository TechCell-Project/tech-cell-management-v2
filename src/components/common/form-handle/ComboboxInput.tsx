import {
  Button,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui';
import { cn } from '@/lib/utils';
import { CheckIcon, ChevronsUpDown, Command } from 'lucide-react';
import { ReactNode } from 'react';
import { Control, FieldPath, FieldValues, UseFormSetValue } from 'react-hook-form';
import { Options } from './form.type';

type ComboboxInputProps<TFieldValue extends FieldValues, TOptions> = {
  name: FieldPath<TFieldValue>;
  label: string;
  control: Control<TFieldValue, any>;
  description?: string | ReactNode;
  className?: string;
  options: Options<TOptions>[];
  placeholder?: string;
  disabled?: boolean;
  displayField?: string;
  onChange?: (value: string) => void;
  setValue: UseFormSetValue<TFieldValue>;
};

export const ComboboxInput = <TFieldValue extends FieldValues, TOptions>({
  name,
  label,
  control,
  description,
  className,
  options,
  placeholder = 'Chọn',
  disabled,
  displayField = 'value',
  onChange,
  setValue,
}: ComboboxInputProps<TFieldValue, TOptions>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className={`flex flex-col ${className}`}>
          <FormLabel className="text-[13px]">{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    'w-[200px] justify-between',
                    !field.value && 'text-muted-foreground',
                  )}
                >
                  {field.value
                    ? options.find((option) => option.value === field.value)?.label
                    : placeholder}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput
                  placeholder="Tìm kiếm..."
                  className={`${error && 'border-[#ee4949] h-9'}`}
                  disabled={disabled}
                />
                <CommandEmpty>Không có kết quả.</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      value={option.label}
                      key={option.label}
                      onSelect={() => {
                        setValue(name, option.value as any);
                      }}
                    >
                      {option.label}
                      <CheckIcon
                        className={cn(
                          'ml-auto h-4 w-4',
                          option.value === field.value ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="text-[13px]" />
        </FormItem>
      )}
    />
  );
};
