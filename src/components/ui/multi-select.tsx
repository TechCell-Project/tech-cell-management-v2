'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

import { Check, ChevronsUpDown } from 'lucide-react';
import { FieldValues } from 'react-hook-form';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Button } from './button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './command';

interface MultiSelectProps<TOption extends FieldValues> {
  options: TOption[];
  selected: string[];
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
  displayValue?: keyof TOption | string;
  displayLabel?: keyof TOption | string;
}

const MultiSelect = React.forwardRef(
  <TOption extends FieldValues>(
    {
      options,
      selected,
      onChange,
      className,
      displayValue = 'value',
      displayLabel = 'name',
      ...props
    }: Readonly<MultiSelectProps<TOption>>,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const [open, setOpen] = React.useState(false);

    // const handleUnselect = (item: string) => {
    //   onChange(selected.filter((i) => i !== item));
    // };

    return (
      <Popover open={open} onOpenChange={setOpen} {...props}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className='w-full justify-between h-10'
            onClick={() => setOpen(!open)}
          >
            <div className="flex gap-1 flex-wrap">
              <p>{selected?.length} items</p>
              {/* {selected?.map((item) => (
                <Badge
                  variant="secondary"
                  key={item}
                  className="mr-1 mb-1"
                  onClick={() => handleUnselect(item)}
                >
                  {item}
                  <button
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleUnselect(item);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={() => handleUnselect(item)}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </button>
                </Badge>
              ))} */}
            </div>
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="min-w-[300px] p-0">
          <Command className={className}>
            <CommandInput placeholder="Tìm kiếm ..." />
            <CommandEmpty>Không có kết quả.</CommandEmpty>
            <CommandList>
              <CommandGroup className="max-h-64 overflow-auto">
                {options?.map((option) => (
                  <CommandItem
                    key={option[displayValue]}
                    onSelect={() => {
                      onChange(
                        selected?.includes(option[displayValue])
                          ? selected?.filter((item) => item !== option[displayValue])
                          : [...selected, option[displayValue]],
                      );
                      setOpen(true);
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        selected?.includes(option[displayValue]) ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                    {option[displayLabel]}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
);

MultiSelect.displayName = 'MultiSelect';

export { MultiSelect };
