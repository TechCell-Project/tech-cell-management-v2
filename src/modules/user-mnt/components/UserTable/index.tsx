'use client';

import { useQuery } from '@tanstack/react-query';
import { getListUserApi } from '../../apis';
import { useEffect, useMemo } from 'react';
import { User, UserSearch } from '../../models';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useUserStore } from '../../store';
import { getSearchParams } from '@/utilities/func.util';
import { DataTable } from '@/components/common/data-table';
import { columns } from './columns';
import { Routes } from '@/constants/enum';
import { UserRoleEnum } from '@techcell/node-sdk';
import { AddToggle } from '@/components/utils';
import { UserCreate } from '../UserCreate';

const rolesStaff: string[] = Object.values(UserRoleEnum).filter(
  (role) => role !== UserRoleEnum.Customer,
);
const rolesCustomer: string[] = [UserRoleEnum.Customer];

export const UserTable = () => {
  const { listUser, getListSuccess, reset } = useUserStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const roleParams: string[] = pathname === Routes.UserCustomer ? rolesCustomer : rolesStaff;

  const page = searchParams.get('page');
  const limit = searchParams.get('limit');
  const params = JSON.stringify({ roles: roleParams });

  const getParams = useMemo(() => {
    return getSearchParams(new UserSearch(Number(page) || 1, Number(limit) || 10));
  }, [page, limit]);

  const {
    data: dataUsers,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ['users', params, page, limit],
    queryFn: () => {
      if (page && limit) {
        return getListUserApi(searchParams.toString() + `&filters=${params}`);
      }
    },
  });

  useEffect(() => {
    if (!page && !limit) {
      router.push(pathname + '?' + getParams);
    }
  }, [page, limit, router, pathname, getParams]);

  useEffect(() => {
    return () => {
      reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isSuccess && dataUsers) {
    getListSuccess(dataUsers.data);
  }

  return (
    <div className="my-6">
      <DataTable
        columns={columns}
        data={(listUser?.data as User[]) ?? []}
        page={Number(page)}
        limit={Number(limit)}
        hasNextPage={listUser?.hasNextPage as boolean}
        isLoading={isLoading}
      />
      <UserCreate trigger={<AddToggle />} />
    </div>
  );
};
