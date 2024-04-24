import { DropdownDisplayItemProps } from '@/components/common/display';
import { Sku } from '../../models';
import Link from 'next/link';
import { Routes } from '@/constants/enum';

export const columnsAction = (sku: Sku): DropdownDisplayItemProps[] => {
  return [
    {
      content: 'Copy ID',
      key: 'copy-action',
      onClick: () => {
        navigator.clipboard.writeText(sku._id);
      },
    },
    {
      content: <Link href={Routes.MntInventorySku + `/update?id=${sku._id}`}>Cập nhật</Link>,
      key: 'update-action',
      onClick: (e) => {
        e.preventDefault();
      },
    },
  ];
};
