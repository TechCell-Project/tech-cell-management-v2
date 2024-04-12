import { DropdownDisplayItemProps } from '@/components/common/display';
import { User } from '../../models';
import { UserDetails } from '../UserDetails';
import { UserChangeRole } from '../UserChangeRole';
import { UserBlockOrUnblock } from '../UserBlockOrUnblock';
import { UserRoleEnum } from '@techcell/node-sdk';

export const columnsAction = (user: User, currentUserId: string): DropdownDisplayItemProps[] => {
  if (user._id === currentUserId) {
    return [
      {
        content: 'Copy ID',
        key: 'copy-action',
        onClick: () => {
          navigator.clipboard.writeText(user._id);
        },
      },
    ];
  }

  return [
    {
      content: 'Copy ID',
      key: 'copy-action',
      onClick: () => {
        navigator.clipboard.writeText(user._id);
      },
    },
    {
      content: <UserDetails user={user} trigger="Xem chi tiết" />,
      key: 'view-details-action',
      onClick: (e) => {
        e.preventDefault();
      },
    },
    {
      content:
        user.role !== UserRoleEnum.Customer ? (
          <UserChangeRole user={user} trigger="Đổi vai trò" />
        ) : undefined,
      key: 'change-role-action',
      onClick: (e) => {
        e.preventDefault();
      },
    },
    {
      content: (
        <UserBlockOrUnblock user={user} trigger={user.block?.isBlocked ? 'Bỏ chặn' : 'Chặn'} />
      ),
      key: 'bl-and-unb-action',
      onClick: (e) => {
        e.preventDefault();
      },
    },
  ];
};
