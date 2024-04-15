import { Button, Form, useToast } from '@/components/ui';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BrandCreateNew } from '../../models';
import { createBrandValidateSchema } from './validate-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { DialogDisplay } from '@/components/common/display';
import { useMutation } from '@tanstack/react-query';
import { postOneBrandApi } from '../../apis';
import { SelectInput, TextInput } from '@/components/common/form-handle';
import { OPTIONS_STATUS_2 } from '@/constants/options';

export const BrandCreate = memo(({ trigger }: { trigger: ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);

  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  const createBrandForm = useForm<BrandCreateNew>({
    resolver: yupResolver(createBrandValidateSchema),
    defaultValues: new BrandCreateNew(),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = createBrandForm;

  const { mutateAsync } = useMutation({
    mutationFn: (values: BrandCreateNew) => postOneBrandApi(values),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Thêm mới thương hiệu thành công!',
      });

      reset(new BrandCreateNew());
      setOpen(false);

      router.replace(pathname);
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Thêm mới thương hiệu thất bại!',
        description: 'Vui lòng thử lại sau',
      });
    },
  });

  return (
    <DialogDisplay trigger={trigger} title="Thêm mới thương hiệu" open={open} setOpen={setOpen}>
      <Form {...createBrandForm}>
        <form className="mt-3">
          <TextInput<BrandCreateNew> label="Tên thương hiệu" name="name" className="mb-3" />
          <TextInput<BrandCreateNew> label="Mô tả" name="description" className="mb-3" />

          <SelectInput<BrandCreateNew>
            label="Trạng thái"
            name="status"
            options={OPTIONS_STATUS_2}
          />

          <div className="w-full flex justify-end gap-4 mt-7">
            <Button variant="ghost" type="button" onClick={() => setOpen(false)}>
              Đóng
            </Button>
            <Button
              onClick={handleSubmit((data) =>
                mutateAsync({ ...data, slug: data.name.toLowerCase() }),
              )}
              variant="red"
              isLoading={isSubmitting}
            >
              Xác nhận
            </Button>
          </div>
        </form>
      </Form>
    </DialogDisplay>
  );
});

BrandCreate.displayName = 'BrandCreate';
