'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAttributeStore } from '../../store';
import { useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getListAttributeApi } from '../../apis';
import { DataTable } from '@/components/common/data-table';
import { columns } from './columns';
import { Attribute } from '../../models';
import { useSearchQueryParams, useSearchTable } from '@/hooks';
import { AttributeCreate } from '../AttributeCreate';
import { AddToggle } from '@/components/utils';
import { useForm } from 'react-hook-form';
import { FilterAttributeDto } from '@techcell/node-sdk';
import { Button, Form } from '@/components/ui';
import { SelectInput, TextInput } from '@/components/common/form-handle';
import { STATUS_ATTRIBUTE_OPTIONS } from '@/constants/options';

export const AttributeTable = () => {
  const { listAttribute, getListSuccess, reset } = useAttributeStore();
  const { createQueryString } = useSearchQueryParams();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { page, limit, filters } = useSearchTable();

  const filtersParsed = useMemo(() => {
    if (filters) {
      return JSON.parse(filters) as FilterAttributeDto;
    }
  }, [filters]);

  const {
    data: dataAttributes,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ['attibutes', page, limit, filters],
    queryFn: () => {
      if (page && limit) {
        return getListAttributeApi(searchParams.toString());
      }
    },
  });

  const searchAttributeForm = useForm<FilterAttributeDto>({
    defaultValues: {
      name: filtersParsed?.name ?? undefined,
      label: filtersParsed?.label ?? undefined,
      status: filtersParsed?.status ?? undefined,
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = searchAttributeForm;

  useEffect(() => {
    return () => {
      reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isSuccess && dataAttributes) {
    getListSuccess(dataAttributes.data);
  }

  return (
    <div className="my-6">
      <Form {...searchAttributeForm}>
        <form
          onSubmit={handleSubmit((data) => {
            if (isDirty) {
              if (!data?.status?.[0]) {
                delete data.status;
              }
              const params = createQueryString('filters', JSON.stringify(data));
              router.replace(pathname + '?' + params);
            }
          })}
        >
          <div className="grid grid-cols-4 gap-x-5 gap-y-4 items-end mb-6">
            <TextInput<FilterAttributeDto> label="Thông số" name="name" />
            <TextInput<FilterAttributeDto> label="Label" name="label" />
            <SelectInput<FilterAttributeDto>
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
        data={(listAttribute?.data as Attribute[]) ?? []}
        page={Number(page)}
        limit={Number(limit)}
        hasNextPage={listAttribute?.hasNextPage as boolean}
        isLoading={isLoading}
      />
      <AttributeCreate trigger={<AddToggle />} />
    </div>
  );
};
