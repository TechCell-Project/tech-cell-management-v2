import { ReactNode, memo, useState } from 'react';
import { UseFieldArrayAppend } from 'react-hook-form';
import { SpuCreatNew } from '~spu-mnt/models';
import { DialogDisplay } from '@/components/common/display';

type SpuCreateModelProps = {
  trigger: ReactNode;
  append: UseFieldArrayAppend<SpuCreatNew, 'models'>;
};

const SpuCreateModel = memo(({ trigger, append }: SpuCreateModelProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <DialogDisplay trigger={trigger} title="Thêm mới mẫu" open={open} setOpen={setOpen}>
      <></>
    </DialogDisplay>
  );
});

SpuCreateModel.displayName = SpuCreateModel.name;

export default SpuCreateModel;
