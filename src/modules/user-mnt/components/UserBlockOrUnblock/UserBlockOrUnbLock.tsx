import { ReactNode, memo, useState } from 'react';
import { User } from '../../models';

type UserBlockOrUnblockProps = {
  user: User;
  trigger: ReactNode | string;
};

export const UserBlockOrUnblock = memo(({ trigger, user }: UserBlockOrUnblockProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return <></>;
});

UserBlockOrUnblock.displayName = 'UserBlockOrUnblock';
