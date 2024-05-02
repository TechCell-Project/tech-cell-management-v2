'use client';

import { Modal } from '@/components/ui/modal';

import { useSpuModelUpdateModal } from '@/modules/spu-mnt/hooks/useSpuModelUpdateModal';
import { ModelCreateUpdateForm } from './model-create-update-form';

const SpuModelCreateUpdateModal = () => {
  const { model, isOpen, setModel, onClose } = useSpuModelUpdateModal();

  const handleClose = () => {
    setModel(null);
    onClose();
  };

  return (
    <Modal
      title={`${model ? 'Cập nhật' : 'Thêm'} mẫu`}
      isOpen={isOpen}
      onClose={handleClose}
      classContent="max-w-6xl"
    >
      <ModelCreateUpdateForm model={model} handleCloseModal={handleClose} />
    </Modal>
  );
};

export default SpuModelCreateUpdateModal;
