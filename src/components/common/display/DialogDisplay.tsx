'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui';
import { ReactNode } from 'react';

/**
 * DialogProps defines the props for the DialogDisplay component.
 *
 * @property {string | ReactNode} trigger - The content that initiates dialog opening.
 * @property {string | ReactNode} title - The dialog's title, displayed at the top.
 * @property {ReactNode} children - The content to be displayed within the dialog's body.
 * @property {string} [classContent] (optional) - CSS classes to apply to the dialog content.
 * @property {string} [classTrigger] (optional) - CSS classes to apply to the trigger element.
 * @property {boolean} open - Controls the visibility of the dialog (true: open, false: closed).
 * @property {function(boolean)} setOpen - Callback function to toggle the dialog's open state.
 */
type DialogProps = {
  trigger: string | ReactNode;
  title: string | ReactNode;
  children: ReactNode;
  classContent?: string;
  classTrigger?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

/**
 * DialogDisplay Component
 *
 * Provides a reusable modal dialog with customizable trigger, title, content, and styling.
 *
 * @param {DialogProps} props - Props object for the DialogDisplay component.
 * @returns {JSX.Element} - JSX element containing the dialog structure.
 */
export const DialogDisplay = ({
  trigger,
  classTrigger,
  classContent,
  children,
  title,
  open,
  setOpen,
}: DialogProps): JSX.Element => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={classTrigger}>{trigger}</DialogTrigger>
      <DialogContent
        className={`${classContent} overflow-y-scroll overflow-x-hidden max-h-screen no-scrollbar`}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{children}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
