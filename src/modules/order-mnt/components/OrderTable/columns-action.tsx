import { DropdownDisplayItemProps } from '@/components/common/display';
import { Routes } from '@/constants/enum';
import Link from 'next/link';
import { Order } from '../../models';

export const columnsAction = (order: Order): DropdownDisplayItemProps[] => {
  return [
    {
      content: 'Copy ID',
      key: 'copy-id-action',
      onClick: () => {
        navigator.clipboard.writeText(order._id);
      },
    },
    {
      content: 'Copy ship code',
      key: 'copy-ship-code-action',
      onClick: () => {
        navigator.clipboard.writeText(order.shipping.orderShipCode);
      },
    },
    {
      content: <Link href={Routes.MntOrder + `/update?id=${order._id}`}>Cập nhật</Link>,
      key: 'update-action',
      onClick: (e) => {
        e.preventDefault();
      },
    },
  ];
};
