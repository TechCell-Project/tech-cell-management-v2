'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useBrandStore } from '../../store';
import { useEffect, useMemo } from 'react';
import { getSearchParams } from '@/utilities/func.util';
import { BrandSearch } from '../../models/brand-search';
import { useQuery } from '@tanstack/react-query';
import { getListBrandApi } from '../../apis';
import { columns } from './columns';
import { DataTable } from '@/components/common/data-table';
import { BrandCreate } from '../BrandCreate';
import { AddToggle } from '@/components/utils';
import { Brand } from '../../models';

export const BrandTable = () => {
  const { listBrand, getListSuccess, reset } = useBrandStore();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const page = searchParams.get('page');
  const limit = searchParams.get('limit');
  const filters = searchParams.get('filters');
  const sorts = searchParams.get('sorts');

  const getParams = useMemo(() => {
    return getSearchParams(
      new BrandSearch(Number(page) || 1, Number(limit) || 10, filters as string, sorts as string),
    );
  }, [page, limit, filters, sorts]);

  const {
    data: dataBrands,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ['users', page, limit, filters, sorts],
    queryFn: () => {
      if (page && limit) {
        return getListBrandApi(searchParams.toString());
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

  if (isSuccess && dataBrands) {
    getListSuccess(dataBrands.data);
  }

  return (
    <div className="my-6">
      <DataTable
        columns={columns}
        data={(listBrand?.data as Brand[]) ?? []}
        page={Number(page)}
        limit={Number(limit)}
        hasNextPage={listBrand?.hasNextPage as boolean}
        isLoading={isLoading}
      />
      <BrandCreate trigger={<AddToggle />} />
    </div>
  );
};
