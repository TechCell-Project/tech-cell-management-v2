import { DropdownDisplayItemProps } from '@/components/common/display';
import { Sku } from '../../models';
import Link from 'next/link';
import { Routes } from '@/constants/enum';
import { getOneSessionStorage } from '@/utilities/session.util';
import { AuthLoginResponse } from '@/modules/auth/models';
import { UserRoleEnum } from '@techcell/node-sdk';
import SkuCreateSerials from '../SkuCreateSerials';

const user = getOneSessionStorage<AuthLoginResponse>('user', 'object');

export const columnsAction = (sku: Sku): DropdownDisplayItemProps[] => {
  const createSerialAction: DropdownDisplayItemProps = {
    content: <SkuCreateSerials sku={sku} trigger="Thêm sản phẩm" />,
    key: 'update-action',
    onClick: (e) => {
      e.preventDefault();
    },
  };

  const withOutCreateSerialAction: DropdownDisplayItemProps[] = [
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

  if ((user as AuthLoginResponse)?.user.role === UserRoleEnum.Warehouse) {
    return [...withOutCreateSerialAction, createSerialAction];
  }

  return withOutCreateSerialAction;
};
