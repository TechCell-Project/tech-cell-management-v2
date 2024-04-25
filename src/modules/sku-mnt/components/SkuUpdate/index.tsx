'use client';

import { Button, Form, Separator, useToast } from '@/components/ui';
import { useForm } from 'react-hook-form';
import { useSkuStore } from '../../store';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getOneSkuApi, patchOneSkuApi } from '../../apis';
import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useFetchOptionData } from '../../hooks';
import { useRouter } from 'next/navigation';
import { UpdateSkuDto } from '@techcell/node-sdk';
import SkuUpdateInfo from './SkuUpdateInfo';
import SkuUpdateImage from './SkuUpdateImage';
import SkuUpdateAdditional from './SkuUpdateAdditional';
import { getFieldChanges } from '@/utilities/func.util';

export const SkuUpdate = ({ id }: { id: string }) => {
  const { sku, getOneSuccess, resetOne } = useSkuStore();

  const { listSpu, listTag } = useFetchOptionData();

  const { toast } = useToast();
  const { theme } = useTheme();
  const router = useRouter();

  const { data: dataDetails, isSuccess } = useQuery({
    queryKey: ['sku-update', id],
    queryFn: () => getOneSkuApi(id),
  });

  if (dataDetails && isSuccess) {
    getOneSuccess(dataDetails.data);
  }

  const { mutateAsync } = useMutation({
    mutationFn: (values: Partial<UpdateSkuDto>) => patchOneSkuApi(id, values),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Cập nhật thành công!',
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Cập nhật thất bại!',
        description: 'Vui lòng thử lại sau',
      });
    },
  });

  const updateSkuForm = useForm({
    values: sku,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = updateSkuForm;

  useEffect(() => {
    return () => {
      resetOne();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    sku && (
      <Form {...updateSkuForm}>
        <form
          className={`rounded-md border py-5 px-6 ${theme === 'light' && 'bg-white'}`}
          onSubmit={handleSubmit((data) => {
            const newValue = getFieldChanges(data, sku);
            if (newValue.attributes) {
              delete newValue.attributes;
            }

            mutateAsync(newValue as Partial<UpdateSkuDto>);
          })}
        >
          <SkuUpdateImage />
          <Separator className="my-7" />
          <SkuUpdateInfo listSpu={listSpu} />
          <Separator className="my-7" />
          <SkuUpdateAdditional listTag={listTag} />

          <div className="w-full flex justify-end gap-4 mt-7">
            <Button variant="ghost" type="button" onClick={() => router.back()}>
              Quay lại
            </Button>
            <Button variant="red" type="submit" isLoading={isSubmitting}>
              Lưu thay đổi
            </Button>
          </div>
        </form>
      </Form>
    )
  );
};
