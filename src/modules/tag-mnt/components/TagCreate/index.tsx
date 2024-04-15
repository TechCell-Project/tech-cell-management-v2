import { ReactNode, memo, useState } from 'react';
import { Button, Form, useToast } from '@/components/ui';
import { usePathname, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { TagCreateNew } from '../../models';
import { yupResolver } from '@hookform/resolvers/yup';
import { createTagValidateSchema } from './validate-schema';
import { useMutation } from '@tanstack/react-query';
import { postOneTagApi } from '../../apis';
import { DialogDisplay } from '@/components/common/display';
import { SelectInput, TextInput } from '@/components/common/form-handle';
import { OPTIONS_STATUS_2 } from '@/constants/options';

export const TagCreate = memo(({ trigger }: { trigger: ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);

  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  const createTagForm = useForm<TagCreateNew>({
    resolver: yupResolver(createTagValidateSchema),
    defaultValues: new TagCreateNew(),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = createTagForm;

  const { mutateAsync } = useMutation({
    mutationFn: (values: TagCreateNew) => postOneTagApi(values),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Thêm mới tiêu chí thành công!',
      });

      reset(new TagCreateNew());
      setOpen(false);

      router.replace(pathname);
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Thêm mới tiêu chí thất bại!',
        description: 'Vui lòng thử lại sau',
      });
    },
  });

  return (
    <DialogDisplay trigger={trigger} title="Thêm mới tiêu chí" open={open} setOpen={setOpen}>
      <Form {...createTagForm}>
        <form className="mt-3">
          <TextInput<TagCreateNew> label="Tiêu chí" name="name" className="mb-3" />
          <TextInput<TagCreateNew> label="Mô tả" name="description" className="mb-3" />

          <SelectInput<TagCreateNew>
            label="Trạng thái"
            name="status"
            options={OPTIONS_STATUS_2}
          />

          <div className="w-full flex justify-end gap-4 mt-7">
            <Button variant="ghost" type="button" onClick={() => setOpen(false)}>
              Đóng
            </Button>
            <Button
              onClick={handleSubmit((data) => mutateAsync(data))}
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

TagCreate.displayName = TagCreate.name;
