'use client';

import { useSearchQueryParams, useSearchTable } from '@/hooks';
import { useTagStore } from '../../store';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { FilterTagDto, FilterTagDtoStatusEnum } from '@techcell/node-sdk';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { getListTagApi } from '../../apis';
import { DataTable } from '@/components/common/data-table';
import { columns } from './columns';
import { Tag } from '../../models';
import { SelectInput, TextInput } from '@/components/common/form-handle';
import { Button, Form } from '@/components/ui';
import { OPTIONS_STATUS_1 } from '@/constants/options';
import { TagCreate } from '../TagCreate';
import { AddToggle } from '@/components/utils';

export const TagTable = () => {
  const { listTag, getListSuccess, reset } = useTagStore();
  const { createQueryString } = useSearchQueryParams();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { page, limit, filters } = useSearchTable();

  const filtersParsed = useMemo(() => {
    if (filters) {
      return JSON.parse(filters) as FilterTagDto;
    }
  }, [filters]);

  const {
    data: dataTags,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ['tags', page, limit, filters],
    queryFn: () => {
      if (page && limit) {
        return getListTagApi(searchParams.toString());
      }
    },
  });

  const searchTagForm = useForm<FilterTagDto>({
    defaultValues: {
      status: filtersParsed?.status ?? undefined,
      slug: filtersParsed?.slug ?? undefined,
      keyword: filtersParsed?.keyword ?? undefined,
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = searchTagForm;

  useEffect(() => {
    return () => {
      reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isSuccess && dataTags) {
    getListSuccess(dataTags.data);
  }

  return (
    <div className="mt-6">
      <Form {...searchTagForm}>
        <form
          onSubmit={handleSubmit((data) => {
            const params = createQueryString('filters', JSON.stringify(data));
            router.replace(pathname + '?' + params);
          })}
          className="mb-8"
        >
          <div className="grid grid-cols-4 gap-x-5 gap-y-4 items-end">
            <TextInput<FilterTagDto> label="Từ khóa" name="keyword" />
            <SelectInput<FilterTagDto>
              label="Trạng thái"
              name={`status.${0}`}
              options={OPTIONS_STATUS_1}
            />
            <Button variant="redLight" className="w-min" isLoading={isSubmitting} type="submit">
              Tìm kiếm
            </Button>
          </div>
        </form>
      </Form>

      <DataTable
        columns={columns}
        data={(listTag?.data as Tag[]) ?? []}
        page={Number(page)}
        limit={Number(limit)}
        hasNextPage={listTag?.hasNextPage as boolean}
        isLoading={isLoading}
      />

      <TagCreate trigger={<AddToggle />} />
    </div>
  );
};
