'use client';

import { useQuery } from '@tanstack/react-query';
import { getListUserApi } from '../../apis';
import { useEffect, useState } from 'react';
import { User, UserSearch } from '../../models';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUserStore } from '../../store';
import { getSearchParams } from '@/utilities/func.util';
import { Routes } from '@/constants/enum';
import { DataTable } from '@/components/common/data-table';
import { columns } from './columns';

export const UserTable = () => {
  const { listUser, getListSuccess } = useUserStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get('page');
  const limit = searchParams.get('limit');

  useEffect(() => {
    if (!page && !limit) {
      router.replace(
        Routes.User + '?' + getSearchParams(new UserSearch(Number(page) || 1, Number(limit) || 10)),
      );
    }
  }, [router]);

  const {
    data: dataUsers,
    isSuccess,
    isFetched,
  } = useQuery({
    queryKey: ['users', searchParams.toString()],
    queryFn: () => getListUserApi(searchParams.toString()),
  });

  if (isSuccess) {
    getListSuccess(dataUsers.data);
  }

  if (isFetched) {
    return <DataTable columns={columns} data={listUser?.data as User[] ?? []} />;
  }
};
