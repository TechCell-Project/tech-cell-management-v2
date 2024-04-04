'use client';

import { MouseEventHandler, ReactNode } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui';

/**
 * DropdownDisplayItemProps Type
 *
 * @property {string} content - The content of the dropdown item.
 * @property {MouseEventHandler<HTMLDivElement>} onClick - The event handler function triggered when the dropdown item is clicked.
 */
export type DropdownDisplayItemProps = {
  content: string;
  onClick: MouseEventHandler<HTMLDivElement>;
};

/**
 * DropdownDisplayProps Type
 *
 * Defines the props for the DropdownDisplay component.
 *
 * @property {ReactNode | string} trigger - The element that triggers the dropdown display. It can be a ReactNode or a string.
 * @property {string} label - The label for the dropdown menu.
 * @property {DropdownDisplayItemProps[]} items - The array of items to be displayed in the dropdown menu.
 * @property {string} [className] - Additional CSS classes to be applied to the dropdown menu container.
 * @property {'end' | 'center' | 'start'} [align='end'] - The alignment of the dropdown menu.
 */
export type DropdownDisplayProps = {
  trigger: ReactNode | string;
  label: string;
  items: DropdownDisplayItemProps[];
  className?: string;
  align?: 'end' | 'center' | 'start';
};

/**
 * DropdownDisplay component displays a dropdown menu with a label and clickable items.
 *
 * @param {DropdownDisplayProps} props - The properties passed to the DropdownDisplay component.
 * @returns {JSX.Element} The DropdownDisplay component with the specified trigger element, label, and dropdown items.
 */
export const DropdownDisplay = ({
  trigger,
  label,
  items,
  className,
  align = 'end',
}: DropdownDisplayProps): JSX.Element => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent align={align} className={className}>
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.map((item) => (
          <DropdownMenuItem onClick={item.onClick} key={item.content} className="cursor-pointer">
            {item.content}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
