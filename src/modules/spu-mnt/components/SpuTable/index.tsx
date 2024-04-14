'use client';

import { useSearchQueryParams, useSearchTable } from '@/hooks';
import { useSpuStore } from '../../store';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { FilterSpuDto } from '@techcell/node-sdk';
import { useQuery } from '@tanstack/react-query';
import { getListSpuApi } from '../../apis';
import { useForm } from 'react-hook-form';
import { DataTable } from '@/components/common/data-table';
import { Spu } from '../../models';
import { columns } from './columns';
import { Button, Form } from '@/components/ui';
import { SelectInput } from '@/components/common/form-handle';
import { STATUS_ATTRIBUTE_OPTIONS } from '@/constants/options';

export const SpuTable = () => {
  const { listSpu, getListSuccess, reset } = useSpuStore();
  const { createQueryString } = useSearchQueryParams();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { page, limit, filters } = useSearchTable();

  const filtersParsed = useMemo(() => {
    if (filters) {
      return JSON.parse(filters) as FilterSpuDto;
    }
  }, [filters]);

  const {
    data: dataSpus,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ['spus', page, limit, filters],
    queryFn: () => {
      if (page && limit) {
        return getListSpuApi(searchParams.toString());
      }
    },
  });

  const searchSpuForm = useForm<FilterSpuDto>({
    defaultValues: {
      status: filtersParsed?.status ?? undefined,
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = searchSpuForm;

  useEffect(() => {
    return () => {
      reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isSuccess && dataSpus) {
    getListSuccess(dataSpus.data);
  }

  return (
    <div className="mt-6">
      <Form {...searchSpuForm}>
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
            <SelectInput<FilterSpuDto>
              label="Trạng thái"
              name={`status.${0}`}
              options={STATUS_ATTRIBUTE_OPTIONS}
            />
            <Button variant="redLight" className="w-min" isLoading={isSubmitting} type="submit">
              Tìm kiếm
            </Button>
          </div>
        </form>
      </Form>
      
      <DataTable
        columns={columns}
        data={(listSpu?.data as Spu[]) ?? []}
        page={Number(page)}
        limit={Number(limit)}
        hasNextPage={listSpu?.hasNextPage as boolean}
        isLoading={isLoading}
      />
    </div>
  );
};
