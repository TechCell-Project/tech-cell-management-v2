import { DropdownDisplayItemProps } from '@/components/common/display';
import { Attribute } from '../../models';
import { AttributeDelete } from '../AttributeDelete';
import { AttributeUpdate } from '../AttributeUpdate';

export const columnsAction = (attribute: Attribute): DropdownDisplayItemProps[] => {
  return [
    {
      content: 'Copy ID',
      key: 'copy-action',
      onClick: () => {
        navigator.clipboard.writeText(attribute._id);
      },
    },
    {
      content: <AttributeUpdate attribute={attribute} trigger="Cập nhật" />,
      key: 'update-action',
      onClick: (e) => {
        e.preventDefault();
      },
    },
    {
      content: <AttributeDelete attribute={attribute} trigger="Xóa" />,
      key: 'delete-action',
      onClick: (e) => {
        e.preventDefault();
      },
    },
  ];
};
