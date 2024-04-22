'use client';

import { useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSpuStore } from '../../store';
import { getOneSpuApi, patchOneSpuApi } from '../../apis';
import { useForm } from 'react-hook-form';
import { Spu, SpuUpdate as SpuUpdateDto } from '../../models';
import { Button, Form, Separator, useToast } from '@/components/ui';
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
  const { toast } = useToast();

  const { data: dataDetails, isSuccess } = useQuery({
    queryKey: ['spu-update', id],
    queryFn: () => getOneSpuApi(id),
  });

  if (dataDetails && isSuccess) {
    getOneSuccess(dataDetails.data);
  }

  const updateSpuform = useForm<Spu>({
    values: spu,
  });

  const onSubmit = useCallback(
    (values: Partial<SpuUpdateDto>) => {
      patchOneSpuApi(id, values)
        .then(() => {
          toast({
            variant: 'success',
            title: 'Cập nhật spu thành công!',
          });
        })
        .catch(() => {
          toast({
            variant: 'destructive',
            title: 'Cập nhật spu thất bại!',
            description: 'Vui lòng thử lại sau',
          });
        });
    },
    [id, toast],
  );

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
        <form className={`rounded-md border py-5 px-6 ${theme === 'light' && 'bg-white'}`}>
          <SpuUpdateInfo listBrand={listBrand} onSubmit={onSubmit} />
          <Separator className="my-7" />
          <SpuUpdateCommonAttr listAttribute={listAttribute} onSubmit={onSubmit}  />
          <Separator className="my-7" />
          <SpuUpdateModelTable />

          <div className="w-full flex justify-end gap-4 mt-7">
            <Button variant="ghost" type="button" onClick={() => router.back()}>
              Quay lại
            </Button>
          </div>
        </form>
      </Form>
    )
  );
};
