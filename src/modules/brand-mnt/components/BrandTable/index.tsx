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
import { Button, Form } from '@/components/ui';
import { useForm } from 'react-hook-form';
import { SelectInput } from '@/components/common/form-handle';
import { STATUS_BRAND_OPTIONS } from '@/constants/options';
import { FilterBrandsDto } from '@techcell/node-sdk';

export const BrandTable = () => {
  const { listBrand, getListSuccess, reset } = useBrandStore();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const page = searchParams.get('page');
  const limit = searchParams.get('limit');
  const filtersParam = searchParams.get('filters');
  // const sortsParam = searchParams.get('sorts');

  const getParams = useMemo(() => {
    return getSearchParams(new BrandSearch(Number(page) || 1, Number(limit) || 10));
  }, [page, limit]);

  const {
    data: dataBrands,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ['users', page, limit, filtersParam],
    queryFn: () => {
      if (page && limit) {
        return getListBrandApi(searchParams.toString());
      }
    },
  });

  const searchBrandForm = useForm<FilterBrandsDto>({
    defaultValues: {
      status: filtersParam ? [JSON.parse(filtersParam)?.status[0]] : [],
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = searchBrandForm;

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
      <Form {...searchBrandForm}>
        <div className="grid grid-cols-4 gap-x-5 gap-y-4 items-end mb-6">
          <SelectInput label="Trạng thái" name="status[0]" options={STATUS_BRAND_OPTIONS} />
          <Button
            variant="redLight"
            className="w-min"
            isLoading={isSubmitting}
            onClick={handleSubmit((data) => {
              const params = new URLSearchParams(searchParams.toString());
              params.set('filters', JSON.stringify(data));

              router.replace(pathname + '?' + params.toString());
            })}
          >
            Tìm kiếm
          </Button>
        </div>
      </Form>

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
