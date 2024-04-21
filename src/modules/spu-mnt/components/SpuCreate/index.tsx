'use client';

import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Separator, useToast } from '@/components/ui';
import { SpuCreatNew } from '../../models';
import { postOneSpuApi } from '../../apis';
import SpuCreateCommonAttr from './SpuCreateCommonAttr';
import SpuCreateInfo from './SpuCreateInfo';
import SpuCreateModelTable from './SpuCreateModelTable';
import { yupResolver } from '@hookform/resolvers/yup';
import { createSpuValidateSchema } from './validate-schema';
import { useFetchOptionData } from '../../hooks';

export const SpuCreate = () => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const router = useRouter();

  const { listBrand, listAttribute } = useFetchOptionData();

  const createSpuForm = useForm<SpuCreatNew>({
    resolver: yupResolver(createSpuValidateSchema),
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
        onSubmit={handleSubmit((data) => {
          const commonAttr = data.commonAttributes.map((attr) => {
            if (!attr.u) {
              delete attr.u;
            }
            return attr;
          });

          mutateAsync({ ...data, commonAttributes: commonAttr });
        })}
        className={`rounded-md border py-5 px-6 ${theme === 'light' && 'bg-white'}`}
      >
        <SpuCreateInfo listBrand={listBrand} />
        <Separator className="my-7" />
        <SpuCreateCommonAttr listAttribute={listAttribute} />
        <Separator className="my-7" />
        <SpuCreateModelTable listAttribute={listAttribute} />

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
