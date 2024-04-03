'use client';

import { ReactNode } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui';

/**
 * TooltipDisplayProps Type
 *
 * Defines the props for the TooltipDisplay component
 *
 * @property {ReactNode | string} trigger - The element that triggers the tooltip display. It can be a ReactNode or a string.
 * @property {string} content - The content of the tooltip.
 * @property {string} [className] - Additional CSS classes to be applied to the tooltip content.
 * @property {'top' | 'right' | 'bottom' | 'left'} [side='bottom'] - The side of the trigger element where the tooltip should be displayed.
 */
type TooltipDisplayProps = {
  trigger: ReactNode | string;
  content: string;
  className?: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
};

/**
 * TooltipDisplay component displays a tooltip with provided content when triggered by a specified element.
 *
 * @param {TooltipDisplayProps} props - The properties passed to the TooltipDisplay component.
 * @returns {JSX.Element} The TooltipDisplay component with the specified trigger element and tooltip content.
 */
export const TooltipDisplay = ({
  trigger,
  content,
  className,
  side = 'bottom',
}: TooltipDisplayProps): JSX.Element => {
  return (
    <Tooltip>
      <TooltipTrigger>{trigger}</TooltipTrigger>
      <TooltipContent className={className} side={side} sideOffset={10}>
        <p className="text-[13px] font-medium">{content}</p>
      </TooltipContent>
    </Tooltip>
  );
};
