'use client';

import { useForm } from 'react-hook-form';
import { SkuCreateNew } from '../../models';
import { Button, Form, Separator } from '@/components/ui';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import SkuCreateInfo from './SkuCreateInfo';
import { useFetchOptionData } from '../../hooks';
import SkuCreateAdditional from './SkuCreateAdditional';
import SkuCreateImage from './SkuCreateImage';
import SkuCreateAttribute from './SkuCreateAttribute';

export const SkuCreate = () => {
  const { theme } = useTheme();
  const router = useRouter();

  const { listSpu, listAttribute, listTag } = useFetchOptionData();

  const createSkuForm = useForm<SkuCreateNew>({
    defaultValues: new SkuCreateNew(),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = createSkuForm;

  return (
    <Form {...createSkuForm}>
      <form
        onSubmit={handleSubmit((data) => {
          // const commonAttr = data.commonAttributes.map((attr) => {
          //   if (!attr.u) {
          //     delete attr.u;
          //   }
          //   return attr;
          // });
          // mutateAsync({ ...data, commonAttributes: commonAttr });
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
