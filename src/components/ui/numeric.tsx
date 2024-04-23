'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { NumericFormatProps, NumericFormat } from 'react-number-format';

interface NumericProps {
  onChange: (event: { target: { name: string; value: string | number } }) => void;
  name: string;
  defaultValue: string | number;
  className?: string;
}

export const Numeric = React.forwardRef<NumericFormatProps, NumericProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, className, defaultValue, ...other } = props;

    return (
      <NumericFormat
        {...other}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        getInputRef={ref}
        type="tel"
        defaultValue={defaultValue}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: Number(values.value),
            },
          });
        }}
        thousandSeparator
        valueIsNumericString
        suffix=" ₫"
      />
    );
  },
);
