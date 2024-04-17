'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Separator, useToast } from '@/components/ui';
import { SpuCreatNew } from '../../models';
import { postOneSpuApi } from '../../apis';
import { getSearchParams } from '@/utilities/func.util';
import { SearchRequest } from '@/common/model';
import { useBrandStore } from '~brand-mnt/store';
import { getListBrandApi } from '~brand-mnt/apis';
import { useAttributeStore } from '~attribute-mnt/store';
import { getListAttributeApi } from '~attribute-mnt/apis';

import SpuCreateCommonAttr from './SpuCreateCommonAttr';
import SpuCreateInfo from './SpuCreateInfo';
import SpuCreateModelTable from './SpuCreateModelTable';

export const SpuCreate = () => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const router = useRouter();

  const { listBrand, getListSuccess: getListBrandSuccess, reset: resetBrand } = useBrandStore();
  const {
    listAttribute,
    getListSuccess: getListAttrSuccess,
    reset: resetAttr,
  } = useAttributeStore();

  useEffect(() => {
    const fetchInitData = () => {
      const params = getSearchParams(new SearchRequest(1, 100));

      getListBrandApi(params)
        .then(({ data }) => getListBrandSuccess(data))
        .catch(() => {
          throw new Error();
        });

      getListAttributeApi(params)
        .then(({ data }) => getListAttrSuccess(data))
        .catch(() => {
          throw new Error();
        });
    };
    fetchInitData();

    return () => {
      resetBrand();
      resetAttr();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createSpuForm = useForm<SpuCreatNew>({
    defaultValues: new SpuCreatNew(),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = createSpuForm;

  const { mutateAsync } = useMutation({
    mutationFn: (values: SpuCreatNew) => postOneSpuApi(values),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Thêm mới spu thành công!',
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Thêm mới spu thất bại!',
        description: 'Vui lòng thử lại sau',
      });
    },
  });

  return (
    <Form {...createSpuForm}>
      <form
        onSubmit={handleSubmit((data) => {})}
        className={`rounded-md border py-5 px-6 ${theme === 'light' && 'bg-white'}`}
      >
        <SpuCreateInfo listBrand={listBrand} />
        <Separator className="my-7" />
        <SpuCreateCommonAttr listAttribute={listAttribute} />
        <Separator className="my-7" />
        <SpuCreateModelTable />

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
  );
};
