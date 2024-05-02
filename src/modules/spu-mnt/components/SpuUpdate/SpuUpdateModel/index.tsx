'use client';

import { MouseEvent } from 'react';
import { Button } from '@/components/ui';
import { SPUModelSchemaDto } from '@techcell/node-sdk';
import { useSpuModelUpdateModal } from '@/modules/spu-mnt/hooks/useSpuModelUpdateModal';
import { PencilLine } from 'lucide-react';

type SpuUpdateModelProps = {
  trigger: string;
  model: SPUModelSchemaDto;
};

export const SpuUpdateModel = ({ trigger, model }: SpuUpdateModelProps) => {
  const { setModel, onOpen } = useSpuModelUpdateModal();

  const handleOpenModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setModel(model);
    onOpen();
  };

  return (
    <Button variant="outline" className="py-2 gap-3 hover:bg-white" onClick={handleOpenModal}>
      <PencilLine className='w-5 h-5' />
      {trigger}
    </Button>
  );
};
