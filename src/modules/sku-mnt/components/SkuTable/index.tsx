'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useSearchTable } from '@/hooks';
import { useSkuStore } from '../../store';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getListSkuApi } from '../../apis';
import { DataTable } from '@/components/common/data-table';
import { columns } from './columns';
import { Sku } from '../../models';
import { AddToggle } from '@/components/utils';
import { Routes } from '@/constants/enum';

export const SkuTable = () => {
  const { listSku, getListSuccess, reset } = useSkuStore();

  const router = useRouter();
  const searchParams = useSearchParams();
  const { page, limit, filters } = useSearchTable();

  // const filtersParsed = useMemo(() => {
  //   if (filters) {
  //     return JSON.parse(filters) as FilterSkuDto;
  //   }
  // }, [filters]);

  const {
    data: dataSkus,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ['skus', page, limit, filters],
    queryFn: () => {
      if (page && limit) {
        return getListSkuApi(searchParams.toString());
      }
    },
  });

  useEffect(() => {
    return () => {
      reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isSuccess && dataSkus) {
    getListSuccess(dataSkus.data);
  }

  return (
    <div className="mt-6">
      <DataTable
        columns={columns}
        data={listSku?.data ?? []}
        page={Number(page)}
        limit={Number(limit)}
        hasNextPage={listSku?.hasNextPage as boolean}
        isLoading={isLoading}
      />

      <AddToggle onClick={() => router.push(Routes.MntInventorySku + '/create')} />
    </div>
  );
};
