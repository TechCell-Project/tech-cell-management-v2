'use client';

import { Button } from '@/components/ui';
import { SPUModelSchemaDto } from '@techcell/node-sdk';
import { useSpuModelUpdateModal } from '@/modules/spu-mnt/hooks/useSpuModelUpdateModal';

type SpuUpdateModelProps = {
  trigger: string;
  model: SPUModelSchemaDto;
};

const SpuUpdateModel = ({ trigger, model }: SpuUpdateModelProps) => {
    const { setModel, onOpen } = useSpuModelUpdateModal();
  
    const handleOpenModal = () => {
      try {
        setModel(model);
      } finally {
        onOpen();
      }
    }
  
    return (
      <Button
        variant="ghost"
        className="justify-start w-full p-0 h-auto"
        onClick={handleOpenModal}
      >
        {trigger}
      </Button>
    )
};

export default SpuUpdateModel;
