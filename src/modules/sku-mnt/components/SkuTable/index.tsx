'use client';

import { useSearchQueryParams, useSearchTable } from '@/hooks';
import { useSkuStore } from '../../store';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getListSkuApi } from '../../apis';
import { DataTable } from '@/components/common/data-table';
import { columns } from './columns';
import { Sku } from '../../models';

export const SkuTable = () => {
  const { listSku, getListSuccess, reset } = useSkuStore();
  // const { createQueryString } = useSearchQueryParams();

  // const router = useRouter();
  // const pathname = usePathname();
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
        data={(listSku?.data as Sku[]) ?? []}
        page={Number(page)}
        limit={Number(limit)}
        hasNextPage={listSku?.hasNextPage as boolean}
        isLoading={isLoading}
      />
    </div>
  );
};
