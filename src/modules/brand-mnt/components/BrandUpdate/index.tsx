import { ReactNode, memo, useState } from 'react';
import { Brand, BrandUpdate as BrandUpdateDto } from '../../models';
import { Button, Form, useToast } from '@/components/ui';
import { usePathname, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { createBrandValidateSchema } from '../BrandCreate/validate-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { patchOneBrandApi } from '../../apis';
import { DialogDisplay } from '@/components/common/display';
import { SelectInput, TextInput } from '@/components/common/form-handle';
import { STATUS_BRAND_OPTIONS } from '@/constants/options';
import { getFieldChanges } from '@/utilities/func.util';

export const BrandUpdate = memo(({ trigger, brand }: { trigger: ReactNode; brand: Brand }) => {
  const [open, setOpen] = useState<boolean>(false);

  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  const updateBrandForm = useForm<BrandUpdateDto>({
    resolver: yupResolver(createBrandValidateSchema),
    defaultValues: new BrandUpdateDto(brand),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = updateBrandForm;

  const { mutateAsync } = useMutation({
    mutationFn: (values: Partial<BrandUpdateDto>) => patchOneBrandApi(brand._id, values),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Cập nhật thương hiệu thành công!',
      });

      setOpen(false);
      router.replace(pathname);
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Cập nhật thương hiệu thất bại!',
        description: 'Vui lòng thử lại sau',
      });
    },
  });

  return (
    <DialogDisplay trigger={trigger} title="Cập nhật thương hiệu" open={open} setOpen={setOpen}>
      <Form {...updateBrandForm}>
        <form className="mt-3">
          <TextInput<BrandUpdateDto> label="Tên thương hiệu" name="name" className="mb-3" />
          <TextInput<BrandUpdateDto> label="Mô tả" name="description" className="mb-3" />

          <SelectInput<BrandUpdateDto>
            label="Trạng thái"
            name="status"
            options={STATUS_BRAND_OPTIONS}
          />

          <div className="w-full flex justify-end gap-4 mt-7">
            <Button variant="ghost" type="button" onClick={() => setOpen(false)}>
              Đóng
            </Button>
            <Button
              onClick={handleSubmit((data) => {
                const values = getFieldChanges<BrandUpdateDto>(data, brand)
                mutateAsync(values)
              })}
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

BrandUpdate.displayName = BrandUpdate.name;
