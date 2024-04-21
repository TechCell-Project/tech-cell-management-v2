'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSpuStore } from '../../store';
import { getOneSpuApi } from '../../apis';
import { useForm } from 'react-hook-form';
import { Spu, SpuUpdate as SpuUpdateDto } from '../../models';
import { Button, Form, Separator } from '@/components/ui';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { SpuUpdateInfo } from './SpuUpdateInfo';
import { SpuUpdateCommonAttr } from './SpuUpdateCommonAttr';
import { useFetchOptionData } from '../../hooks';
import SpuUpdateModelTable from './SpuUpdateModelTable';

export const SpuUpdate = ({ id }: { id: string }) => {
  const { spu, getOneSuccess, resetOne } = useSpuStore();

  const { listAttribute, listBrand } = useFetchOptionData();

  const router = useRouter();
  const { theme } = useTheme();

  const { data: dataDetails, isSuccess } = useQuery({
    queryKey: ['spu-update', id],
    queryFn: () => getOneSpuApi(id),
  });

  if (dataDetails && isSuccess) {
    getOneSuccess(dataDetails.data);
  }

  const updateSpuform = useForm<Spu>({
    // defaultValues: spu,
    values: spu,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = updateSpuform;

  // console.log(watch());

  useEffect(() => {
    return () => {
      resetOne();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    spu &&
    listAttribute &&
    listBrand && (
      <Form {...updateSpuform}>
        <form
          onSubmit={handleSubmit((data) => console.log(data))}
          className={`rounded-md border py-5 px-6 ${theme === 'light' && 'bg-white'}`}
        >
          <SpuUpdateInfo listBrand={listBrand} />
          <Separator className="my-7" />
          <SpuUpdateCommonAttr listAttribute={listAttribute} />
          <Separator className="my-7" />
          <SpuUpdateModelTable />

          <div className="w-full flex justify-end gap-4 mt-7">
            <Button variant="ghost" type="button" onClick={() => router.back()}>
              Quay lại
            </Button>
            <Button type="submit" variant="red" isLoading={isSubmitting}>
              Xác nhận
            </Button>
          </div>
        </form>
      </Form>
    )
  );
};
