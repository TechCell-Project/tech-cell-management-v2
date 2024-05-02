'use client';

import { ReactNode, MouseEvent, memo } from 'react';
import { Button } from '@/components/ui';
import { Sku } from '../../models';
import { useSkuSerialsModal } from '../../hooks/useCreateSkuSerials';

const SkuCreateSerials = ({ trigger, sku }: { trigger: ReactNode; sku: Sku }) => {
  const { setSku, onOpen } = useSkuSerialsModal();

  const handleOpenModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setSku(sku);
    onOpen();
  };

  return (
    <Button
      variant="ghost"
      className="justify-start font-normal w-full p-0 h-auto"
      onClick={handleOpenModal}
    >
      {trigger}
    </Button>
  );
};

export default memo(SkuCreateSerials);
