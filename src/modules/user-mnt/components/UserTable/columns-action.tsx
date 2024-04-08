import { DropdownDisplayItemProps } from '@/components/common/display';
import { User } from '../../models';
import { UserDetails } from '../UserDetails/UserDetails';
import { UserChangeRole } from '../UserChangeRole/UserChangeRole';
import { UserBlockOrUnblock } from '../UserBlockOrUnblock/UserBlockOrUnbLock';

export const columnsAction = (result: User, currentUserId: string): DropdownDisplayItemProps[] => {
  if (result._id === currentUserId) {
    return [
      {
        content: 'Copy ID',
        key: 'copy-action',
        onClick: () => {
          navigator.clipboard.writeText(result._id);
        },
      },
    ];
  }

  return [
    {
      content: 'Copy ID',
      key: 'copy-action',
      onClick: () => {
        navigator.clipboard.writeText(result._id);
      },
    },
    {
      content: <UserDetails user={result} trigger="Xem chi tiết" />,
      key: 'view-details-action',
      onClick: (e) => {
        e.preventDefault();
      },
    },
    {
      content: <UserChangeRole user={result} trigger="Đổi vai trò" />,
      key: 'change-role-action',
      onClick: (e) => {
        e.preventDefault();
      },
    },
    {
      content: (
        <UserBlockOrUnblock user={result} trigger={result.block?.isBlocked ? 'Bỏ chặn' : 'Chặn'} />
      ),
      key: 'bl-and-unb-action',
      onClick: (e) => {
        e.preventDefault();
      },
    },
  ];
};
