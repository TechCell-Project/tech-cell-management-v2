'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

import { Check, ChevronsUpDown, X } from 'lucide-react';
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
import { Badge } from './badge';
import { ScrollArea } from './scroll-area';

interface MultiSelectProps<TOption extends FieldValues> {
  options: TOption[];
  selected: string[];
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
  displayValue?: keyof TOption | string;
  displayLabel?: keyof TOption | string;
  displayType?: 'items' | 'list';
  elementLimit?: number;
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
      displayType = 'items',
      elementLimit,
      ...props
    }: Readonly<MultiSelectProps<TOption>>,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const [open, setOpen] = React.useState(false);

    const handleUnselect = (item: string) => {
      onChange(selected.filter((i) => i !== item));
    };

    return (
      <Popover modal open={open} onOpenChange={setOpen} {...props}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-10"
            onClick={() => setOpen(!open)}
          >
            <div className="flex gap-1 flex-wrap">
              {displayType === 'items' ? (
                <p>{selected?.length} items</p>
              ) : (
                <>
                  {selected?.map((item) => (
                    <Badge variant="secondary" key={item} className="mr-1">
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
                        <X
                          className="h-3 w-3 text-muted-foreground hover:text-foreground"
                          onClick={() => handleUnselect(item)}
                        />
                      </button>
                    </Badge>
                  ))}
                </>
              )}
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
                <ScrollArea>
                  {options?.map((option) => (
                    <CommandItem
                      key={option[displayValue]}
                      onSelect={() => {
                        const isSelected = selected?.includes(option[displayValue]);
                        const isSingleSelection = elementLimit === 1;
                        const isLimitSelection = elementLimit === selected?.length;

                        if (isSelected) {
                          onChange(selected?.filter((item) => item !== option[displayValue]));
                        } else if (isSingleSelection) {
                          onChange([option[displayValue]]);
                        } else if (isLimitSelection) {
                          return;
                        } else {
                          onChange([...selected, option[displayValue]]);
                        }
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
                </ScrollArea>
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
