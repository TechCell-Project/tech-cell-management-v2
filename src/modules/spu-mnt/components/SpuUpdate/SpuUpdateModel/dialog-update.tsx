'use client';

import { DialogDisplay } from '@/components/common/display';
import { SPUModelSchemaDto } from '@techcell/node-sdk';
import { ReactNode, useState } from 'react';
import { ModelCreateUpdateForm } from './model-create-update-form';

interface SpuModelUpdateDialogProps {
  model: SPUModelSchemaDto | null;
  trigger: ReactNode;
}

export const SpuModelUpdateDialog = ({ model, trigger }: SpuModelUpdateDialogProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <DialogDisplay
      trigger={trigger}
      title="Cập nhật mẫu"
      open={open}
      setOpen={setOpen}
      classContent="max-w-6xl"
    >
      <ModelCreateUpdateForm model={model} handleCloseModal={() => setOpen(false)} />
    </DialogDisplay>
  );
};
