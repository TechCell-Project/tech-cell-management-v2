'use client';

import { useSearchParams } from 'next/navigation';
import { useAttributeStore } from '../../store';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getListAttributeApi } from '../../apis';
import { DataTable } from '@/components/common/data-table';
import { columns } from './columns';
import { Attribute } from '../../models';
import { useSearchTable } from '@/hooks';
import { AttributeCreate } from '../AttributeCreate';
import { AddToggle } from '@/components/utils';

export const AttributeTable = () => {
  const { listAttribute, getListSuccess, reset } = useAttributeStore();

  const searchParams = useSearchParams();
  const { page, limit, filters } = useSearchTable();

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
