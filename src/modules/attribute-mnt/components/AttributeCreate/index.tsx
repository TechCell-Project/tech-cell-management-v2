import { DialogDisplay } from '@/components/common/display';
import { Button, Form, useToast } from '@/components/ui';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AttributeCreateNew } from '../../models';
import { yupResolver } from '@hookform/resolvers/yup';
import { createAttrValidateSchema } from './validate-schema';
import { useMutation } from '@tanstack/react-query';
import { postOneAttributeApi } from '../../apis';
import { convertToSnakeCase } from '@/utilities/func.util';
import { TextInput, TextareaInput } from '@/components/common/form-handle';

export const AttributeCreate = memo(({ trigger }: { trigger: ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);

  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  const createAttributeForm = useForm<AttributeCreateNew>({
    resolver: yupResolver(createAttrValidateSchema),
    defaultValues: new AttributeCreateNew(),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = createAttributeForm;

  const { mutateAsync } = useMutation({
    mutationFn: (values: AttributeCreateNew) => postOneAttributeApi(values),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Thêm mới thông số thành công!',
      });

      reset(new AttributeCreateNew());
      setOpen(false);

      router.replace(pathname);
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Thêm mới thông số thất bại!',
        description: 'Vui lòng thử lại sau',
      });
    },
  });

  return (
    <DialogDisplay trigger={trigger} title="Thêm mới thông số" open={open} setOpen={setOpen}>
      <Form {...createAttributeForm}>
        <form className="mt-3">
          <TextInput<AttributeCreateNew>
            label="Tên thông số"
            name="name"
            className="mb-3"
            isDebounce
          />
          <TextInput<AttributeCreateNew> label="Đơn vị" name="unit" className="mb-3" isDebounce />

          <TextareaInput<AttributeCreateNew> label="Mô tả" name="description" isDebounce />

          <div className="w-full flex justify-end gap-4 mt-7">
            <Button variant="ghost" type="button" onClick={() => setOpen(false)}>
              Đóng
            </Button>
            <Button
              onClick={handleSubmit((data) =>
                mutateAsync({ ...data, label: convertToSnakeCase(data.name) }),
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

AttributeCreate.displayName = AttributeCreate.name;
