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
import { Roles, Routes } from '@/constants/enum';

const rolesStaff: string[] = Object.values(Roles).filter((role) => role !== Roles.Customer);
const rolesCustomer: string[] = [Roles.Customer];

export const UserTable = () => {
  const { listUser, getListSuccess, reset } = useUserStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const roleParams: string[] = pathname === Routes.UserCustomer ? rolesCustomer : rolesStaff;

  const page = searchParams.get('page');
  const limit = searchParams.get('limit');
  const roles = JSON.stringify({ roles: roleParams });

  const getParams = useMemo(() => {
    return getSearchParams(new UserSearch(Number(page) || 1, Number(limit) || 10));
  }, [page, limit]);

  const {
    data: dataUsers,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ['users', searchParams.toString(), roles],
    queryFn: () => getListUserApi(searchParams.toString() + `&filters=${roles}`),
  });

  useEffect(() => {
    if (!page && !limit) {
      router.push(pathname + '?' + getParams);
    }

    return () => {
      reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  if (isSuccess) {
    getListSuccess(dataUsers.data);
  }

  return (
    <DataTable
      columns={columns}
      data={(listUser?.data as User[]) ?? []}
      page={Number(page)}
      limit={Number(limit)}
      hasNextPage={listUser?.hasNextPage as boolean}
      isLoading={isLoading}
    />
  );
};
