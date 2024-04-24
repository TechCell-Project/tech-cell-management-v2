'use client';

import { useForm } from 'react-hook-form';
import { SkuCreateNew } from '../../models';
import { Button, Form, Separator, useToast } from '@/components/ui';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import SkuCreateInfo from './SkuCreateInfo';
import { useFetchOptionData } from '../../hooks';
import SkuCreateAdditional from './SkuCreateAdditional';
import SkuCreateImage from './SkuCreateImage';
import SkuCreateAttribute from './SkuCreateAttribute';
import { useMutation } from '@tanstack/react-query';
import { postOneSkuApi } from '../../apis';
import { Routes } from '@/constants/enum';

export const SkuCreate = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const router = useRouter();

  const { listSpu, listAttribute, listTag } = useFetchOptionData();

  const createSkuForm = useForm<SkuCreateNew>({
    defaultValues: new SkuCreateNew(),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = createSkuForm;

  const { mutateAsync } = useMutation({
    mutationFn: (values: SkuCreateNew) => postOneSkuApi(values),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Thêm mới sku thành công!',
      });
      router.push(Routes.MntInventorySku);
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Thêm mới sku thất bại!',
        description: 'Vui lòng thử lại sau',
      });
    },
  });

  return (
    <Form {...createSkuForm}>
      <form
        onSubmit={handleSubmit((data) => {
          const filterAttr = data.attributes.map((attr) => {
            if (!attr.u) {
              delete attr.u;
            }
            return attr;
          });
          mutateAsync({ ...data, attributes: filterAttr });
        })}
        className={`rounded-md border py-5 px-6 ${theme === 'light' && 'bg-white'}`}
      >
        <SkuCreateImage />
        <Separator className="my-7" />
        <SkuCreateInfo listSpu={listSpu} />
        <Separator className="my-7" />
        <SkuCreateAttribute listAttribute={listAttribute} />
        <Separator className="my-7" />
        <SkuCreateAdditional listTag={listTag} />
        <Separator className="my-7" />

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
