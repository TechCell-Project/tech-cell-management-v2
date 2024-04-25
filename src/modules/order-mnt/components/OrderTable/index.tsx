'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useOrderStore } from '../../store';
import { useSearchQueryParams, useSearchTable } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import { getListOrderApi } from '../../apis';
import { useEffect, useMemo } from 'react';
import { DataTable } from '@/components/common/data-table';
import { columns } from './columns';
import { FilterOrdersMntDto } from '@techcell/node-sdk';
import { useForm } from 'react-hook-form';
import { Button, Form } from '@/components/ui';
import { TextInput } from '@/components/common/form-handle';

export const OrderTable = () => {
  const { listOrder, getListSuccess, reset } = useOrderStore();
  const { createQueryString } = useSearchQueryParams();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { page, limit, filters } = useSearchTable();

  const filtersParsed = useMemo(() => {
    if (filters) {
      return JSON.parse(filters) as FilterOrdersMntDto;
    }
  }, [filters]);

  const {
    data: dataOrders,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ['orders', page, limit, filters],
    queryFn: () => {
      if (page && limit) {
        return getListOrderApi(searchParams.toString());
      }
    },
  });

  const searchOrderForm = useForm<FilterOrdersMntDto>({
    defaultValues: {
      keyword: filtersParsed?.keyword ?? undefined,
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = searchOrderForm;

  useEffect(() => {
    return () => {
      reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isSuccess && dataOrders) {
    getListSuccess(dataOrders.data);
  }

  return (
    <div className="mt-6">
      <Form {...searchOrderForm}>
        <form
          onSubmit={handleSubmit((data) => {
            const params = createQueryString('filters', JSON.stringify(data));
            router.replace(pathname + '?' + params);
          })}
          className="mb-8"
        >
          <div className="grid grid-cols-4 gap-x-5 gap-y-4 items-end">
            <TextInput<FilterOrdersMntDto> label="Từ khóa" name="keyword" />

            <Button variant="redLight" className="w-min" isLoading={isSubmitting} type="submit">
              Tìm kiếm
            </Button>
          </div>
        </form>
      </Form>

      <DataTable
        columns={columns}
        data={listOrder?.data ?? []}
        page={Number(page)}
        limit={Number(limit)}
        hasNextPage={listOrder?.hasNextPage as boolean}
        isLoading={isLoading}
      />
    </div>
  );
};
