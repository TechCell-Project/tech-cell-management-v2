import { DropdownDisplayItemProps } from '@/components/common/display';
import { Spu } from '../../models';
import { Routes } from '@/constants/enum';
import Link from 'next/link';

export const columnsAction = (spu: Spu): DropdownDisplayItemProps[] => {
  return [
    {
      content: 'Copy ID',
      key: 'copy-action',
      onClick: () => {
        navigator.clipboard.writeText(spu._id);
      },
    },
    {
      content: <Link href={Routes.MntInventorySpu + `/update?id=${spu._id}`}>Cập nhật</Link>,
      key: 'update-action',
      onClick: (e) => {
        e.preventDefault();
      },
    },
    // {
    //   content: <AttributeDelete attribute={attribute} trigger="Xóa" />,
    //   key: 'delete-action',
    //   onClick: (e) => {
    //     e.preventDefault();
    //   },
    // },
  ];
};
