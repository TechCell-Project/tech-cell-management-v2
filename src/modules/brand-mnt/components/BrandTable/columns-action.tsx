import { DropdownDisplayItemProps } from '@/components/common/display';
import { Brand } from '../../models';
import { BrandUpdate } from '../BrandUpdate';
import { BrandDelete } from '../BrandDelete';

export const columnsAction = (brand: Brand): DropdownDisplayItemProps[] => {
  return [
    {
      content: 'Copy ID',
      key: 'copy-action',
      onClick: () => {
        navigator.clipboard.writeText(brand._id);
      },
    },
    {
      content: <BrandUpdate brand={brand} trigger="Cập nhật" />,
      key: 'update-action',
      onClick: (e) => {
        e.preventDefault();
      },
    },
    {
      content: <BrandDelete brand={brand} trigger="Xóa" />,
      key: 'delete-action',
      onClick: (e) => {
        e.preventDefault();
      },
    },
  ];
};
