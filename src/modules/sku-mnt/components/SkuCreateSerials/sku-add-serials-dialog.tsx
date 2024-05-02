'use client';

import { Modal } from '@/components/ui/modal';
import { useSkuSerialsModal } from '../../hooks/useCreateSkuSerials';
import { SkuAddSerialsForm } from './sku-add-serials-form';

const SkuAddSerialsDialog = () => {
  const { sku, isOpen, setSku, onClose } = useSkuSerialsModal();

  const handleClose = () => {
    setSku(null);
    onClose();
  };

  if (!sku) return null;

  return (
    <Modal
      title={`${sku ? 'Cập nhật' : 'Thêm'} Sản phẩm`}
      isOpen={isOpen}
      onClose={handleClose}
    >
      <SkuAddSerialsForm sku={sku} handleCloseModal={handleClose} />
    </Modal>
  );
};

export default SkuAddSerialsDialog;
