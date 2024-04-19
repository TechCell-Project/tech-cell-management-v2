import {
  Button,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
} from '@/components/ui';
import { cn } from '@/lib/utils';
import { Check, ChevronDown, Command } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';
import { FieldPath, FieldValues, PathValue, useFormContext } from 'react-hook-form';

type TKeyValue<TOption> = {
  key: keyof TOption;
  value: keyof TOption;
};

type ComboboxInputProps<TFieldValues extends FieldValues, OptionType> = {
  className?: string;
  name: FieldPath<TFieldValues>;
  label: string;
  // searchTerm?: string;
  selectPlaceholder?: string;
  inputPlaceholder?: string;
  isLoading?: boolean;
  description?: string | ReactNode;
  onChange?: (value: OptionType[NonNullable<keyof OptionType>]) => void;
  options: OptionType[];
  optionKeyValue: TKeyValue<OptionType>;
};

export const ComboboxInput = <T extends FieldValues, OptionType>({
  className,
  name,
  label,
  selectPlaceholder,
  inputPlaceholder,
  isLoading = false,
  description,
  onChange,
  options,
  optionKeyValue,
}: ComboboxInputProps<T, OptionType>) => {
  const { setValue, watch, control } = useFormContext<T>();

  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [search, setSearch] = useState('');
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  // Handle search event
  const filteredOptions =
    search === ''
      ? options
      : options.filter((option) =>
          String(option[optionKeyValue.value])
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(search.toLowerCase().replace(/\s+/g, '')),
        );

  const fieldWatch = watch(name);

  useEffect(() => {
    if (fieldWatch === undefined || fieldWatch === '') {
      setSelectedLabel(null);
    }
  }, [fieldWatch]);

  // Handle change event when an option is selected
  const handleSelect = (value: string | number, fieldType: string) => {
    const selectedOption = options.find(
      (option) => String(option[optionKeyValue.key]) === String(value),
    );
    if (selectedOption) {
      setSelectedLabel(selectedOption[optionKeyValue.value] as string);
      if (fieldType === 'object') {
        const value = {
          [optionKeyValue.key]: selectedOption[optionKeyValue.key],
        } as PathValue<T, FieldPath<T>>;

        setValue(name, value);
      } else {
        setValue(name, selectedOption[optionKeyValue.key] as PathValue<T, FieldPath<T>>);
      }
      setPopoverOpen(false);
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('w-full flex flex-col', className)}>
          <FormLabel>{label}</FormLabel>
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    'w-full justify-between text-base',
                    !field.value && 'text-muted-foreground',
                  )}
                >
                  {selectedLabel ?? selectPlaceholder}
                  <ChevronDown className="ml-2 h-6 w-6 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent align="center" className="popover-content-width-same-as-its-trigger">
              {isLoading ? (
                <div className="h-24 w-full flex flex-col items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-5 w-5 animate-spin"
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                </div>
              ) : (
                <Command className="w-full" filter={(() => 1) as any}>
                  <CommandInput
                    autoFocus
                    placeholder={inputPlaceholder ?? 'Tìm kiếm...'}
                    value={search}
                    onValueChange={setSearch}
                  />
                  <CommandList>
                    <ScrollArea>
                      {filteredOptions.length === 0 && <CommandEmpty>Không tìm thấy.</CommandEmpty>}
                      <CommandGroup>
                        {filteredOptions.map((item) => {
                          const isSelected =
                            typeof field.value === 'object'
                              ? item[optionKeyValue.key] === field.value[optionKeyValue.key]
                              : item[optionKeyValue.key] === field.value;

                          return (
                            <CommandItem
                              key={String(item[optionKeyValue.key])}
                              value={String(item[optionKeyValue.key])}
                              onSelect={(value) => {
                                handleSelect(value, typeof field.value);
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  isSelected ? 'opacity-100' : 'opacity-0',
                                )}
                              />
                              {String(item[optionKeyValue.value])}
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    </ScrollArea>
                  </CommandList>
                </Command>
              )}
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
