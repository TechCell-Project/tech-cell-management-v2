import { DropdownDisplayItemProps } from '@/components/common/display';
import { Tag } from '../../models';
import { TagUpdate } from '../TagUpdate';

export const columnsAction = (tag: Tag): DropdownDisplayItemProps[] => {
  return [
    {
      content: 'Copy ID',
      key: 'copy-action',
      onClick: () => {
        navigator.clipboard.writeText(tag._id);
      },
    },
    {
      content: <TagUpdate tag={tag} trigger="Cập nhật" />,
      key: 'update-action',
      onClick: (e) => {
        e.preventDefault();
      },
    },
  ];
};
