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
};

export const DialogDisplay = ({
  trigger,
  classNameTrigger,
  classNameContent,
  children,
  title,
}: DialogProps) => {
  return (
    <Dialog>
      <DialogTrigger className={classNameTrigger}>{trigger}</DialogTrigger>
      <DialogContent className={classNameContent}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{children}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
