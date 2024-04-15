import { DropdownDisplayItemProps } from '@/components/common/display';
import { Sku } from '../../models';

export const columnsAction = (sku: Sku): DropdownDisplayItemProps[] => {
  return [
    {
      content: 'Copy ID',
      key: 'copy-action',
      onClick: () => {
        navigator.clipboard.writeText(sku._id);
      },
    },
    // {
    //   content: <AttributeUpdate attribute={attribute} trigger="Cập nhật" />,
    //   key: 'update-action',
    //   onClick: (e) => {
    //     e.preventDefault();
    //   },
    // },
    // {
    //   content: <AttributeDelete attribute={attribute} trigger="Xóa" />,
    //   key: 'delete-action',
    //   onClick: (e) => {
    //     e.preventDefault();
    //   },
    // },
  ];
};
