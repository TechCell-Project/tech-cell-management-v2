import { DialogDisplay } from '@/components/common/display';
import { ReactNode, memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserCreateNew } from '../../models';
import { yupResolver } from '@hookform/resolvers/yup';
import { createUserValidateSchema } from './validate-schema';
import { Button, Form, useToast } from '@/components/ui';
import { useMutation } from '@tanstack/react-query';
import { postOneUserApi } from '../../apis';
import { PasswordInput, SelectInput, TextInput } from '@/components/common/form-handle';
import { SELECT_ROLE_OPTIONS } from '@/constants/options';
import { usePathname, useRouter } from 'next/navigation';

export const UserCreate = memo(({ trigger }: { trigger: ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);

  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  const createUserForm = useForm<UserCreateNew>({
    resolver: yupResolver(createUserValidateSchema),
    defaultValues: new UserCreateNew(),
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = createUserForm;

  const { mutateAsync } = useMutation({
    mutationFn: (values: UserCreateNew) => postOneUserApi(values),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Thêm mới người dùng thành công!',
      });

      reset(new UserCreateNew());
      setOpen(false);

      router.replace(pathname);
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Thêm mới người dùng thất bại!',
        description: 'Vui lòng thử lại sau',
      });
    },
  });

  return (
    <DialogDisplay trigger={trigger} title="Thêm mới người dùng" open={open} setOpen={setOpen}>
      <Form {...createUserForm}>
        <form className="mt-3">
          <div className="grid grid-cols-2 gap-x-5 gap-y-1 mb-3">
            <TextInput<UserCreateNew> label="Họ" name="lastName" />
            <TextInput<UserCreateNew> label="Tên" name="firstName" />
          </div>

          <SelectInput<UserCreateNew>
            label="Chức vụ"
            name="role"
            options={SELECT_ROLE_OPTIONS}
            className="mb-3"
          />

          <TextInput<UserCreateNew>
            label="Email"
            name="email"
            className="mb-3"
            description="Sử dụng định dạng @techcell.cloud"
          />

          <PasswordInput<UserCreateNew> label="Mật khẩu" name="password" />

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

UserCreate.displayName = 'UserCreate';
