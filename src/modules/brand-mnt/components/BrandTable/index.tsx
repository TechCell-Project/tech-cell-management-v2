'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useBrandStore } from '../../store';
import { useEffect, useMemo } from 'react';
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
import { useSearchQueryParams, useSearchTable } from '@/hooks';

export const BrandTable = () => {
  const { listBrand, getListSuccess, reset } = useBrandStore();
  const { createQueryString } = useSearchQueryParams();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { page, limit, filters } = useSearchTable();

  const filtersParsed = useMemo(() => {
    if (filters) {
      return JSON.parse(filters) as FilterBrandsDto;
    }
  }, [filters]);

  const {
    data: dataBrands,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ['brands', page, limit, filters],
    queryFn: () => {
      if (page && limit) {
        return getListBrandApi(searchParams.toString());
      }
    },
  });

  const searchBrandForm = useForm<FilterBrandsDto>({
    defaultValues: {
      status: filtersParsed?.status ?? undefined,
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = searchBrandForm;

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
    <div className="mt-6">
      <Form {...searchBrandForm}>
        <form
          onSubmit={handleSubmit((data) => {
            if (isDirty) {
              const params = createQueryString('filters', JSON.stringify(data));
              router.replace(pathname + '?' + params);
            }
          })}
          className="mb-8"
        >
          <div className="grid grid-cols-4 gap-x-5 gap-y-4 items-end">
            <SelectInput<FilterBrandsDto>
              label="Trạng thái"
              name={`status.${0}`}
              options={STATUS_BRAND_OPTIONS}
            />
            <Button variant="redLight" className="w-min" isLoading={isSubmitting} type="submit">
              Tìm kiếm
            </Button>
          </div>
        </form>
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
