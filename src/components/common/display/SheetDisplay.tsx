import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui';
import { ReactNode } from 'react';

/**
 * SheetDisplayProps Type
 *
 * Defines the props for the SheetDisplay component.
 *
 * @property {ReactNode} trigger - The content that initiates the sheet opening.
 * @property {ReactNode} children - The content to be displayed within the sheet's body.
 * @property {string | ReactNode} title - The sheet's title, displayed at the top.
 * @property {string | ReactNode} [description] (optional) - An optional description or additional information displayed beneath the title.
 * @property {boolean} open - Controls the visibility of the sheet (true: open, false: closed).
 * @property {function(boolean)} setOpen - Callback function to toggle the sheet's open state.
 */
type SheetDisplayProps = {
  trigger: ReactNode;
  children: ReactNode;
  title: string | ReactNode;
  description?: string | ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
};

/**
 * SheetDisplay Component
 *
 * Provides a reusable sheet component with customizable trigger, title, content, and styling.
 * Sheets are typically used for presenting additional information or actions within a user interface.
 *
 * @param {SheetDisplayProps} props - Props object for the SheetDisplay component.
 * @returns {JSX.Element} - JSX element containing the sheet structure.
 */
export const SheetDisplay = ({
  trigger,
  children,
  title,
  description,
  open,
  setOpen,
}: SheetDisplayProps): JSX.Element => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
};
