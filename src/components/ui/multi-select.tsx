'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

import { Check, X, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { FieldValues } from 'react-hook-form';

interface MultiSelectProps<TOption extends FieldValues> {
  options: TOption[];
  selected: string[];
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
  displayValue?: keyof TOption | string;
  displayLabel?: keyof TOption | string;
}

function MultiSelect<TOption extends FieldValues>({
  options,
  selected,
  onChange,
  className,
  displayValue = 'value',
  displayLabel = 'name',
  ...props
}: Readonly<MultiSelectProps<TOption>>) {
  const [open, setOpen] = React.useState(false);

  const handleUnselect = (item: string) => {
    onChange(selected.filter((i) => i !== item));
  };

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-full justify-between ${selected?.length > 1 ? 'h-full' : 'h-10'}`}
          onClick={() => setOpen(!open)}
        >
          <div className="flex gap-1 flex-wrap">
            {selected?.map((item) => (
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
            ))}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className={className}>
          <CommandInput placeholder="Search ..." />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {options.map((option) => (
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
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { MultiSelect };
