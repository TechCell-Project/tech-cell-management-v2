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

type DialogProps = {
  trigger: string | ReactNode;
  title: string | ReactNode;
  children: ReactNode;
  classNameContent?: string;
  classNameTrigger?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const DialogDisplay = ({
  trigger,
  classNameTrigger,
  classNameContent,
  children,
  title,
  open,
  setOpen,
}: DialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={classNameTrigger}>{trigger}</DialogTrigger>
      <DialogContent className={`${classNameContent} overflow-y-scroll max-h-screen`}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{children}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
