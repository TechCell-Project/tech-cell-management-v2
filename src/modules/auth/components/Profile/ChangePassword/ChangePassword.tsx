import { useForm } from 'react-hook-form';
import { AuthChangePassword } from '~auth/models';
import { Button, Form, useToast } from '@/components/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { changePwValidateSchema } from './validate-schema';
import { useMutation } from '@tanstack/react-query';
import { changePasswordApi } from '@/modules/auth/apis';
import { PasswordInput } from '@/components/common/form-handle';

export const ChangePassword = () => {
  const { toast } = useToast();

  const changePasswordForm = useForm<AuthChangePassword>({
    resolver: yupResolver(changePwValidateSchema),
    defaultValues: new AuthChangePassword(),
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = changePasswordForm;

  const { mutateAsync } = useMutation({
    mutationFn: (values: AuthChangePassword) => changePasswordApi(values),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Thay đổi mật khẩu thành công!',
      });
      reset();
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Đổi mật khẩu thất bại',
        description: 'Vui lòng thử lại sau',
      });
    },
  });

  return (
    <Form {...changePasswordForm}>
      <form onSubmit={handleSubmit((data) => mutateAsync(data))}>
        <div className="mt-3 flex flex-col gap-4">
          <PasswordInput<AuthChangePassword>
            name="oldPassword"
            label="Mật khẩu cũ"
            control={control}
          />
          <PasswordInput<AuthChangePassword>
            name="newPassword"
            label="Mật khẩu mới"
            control={control}
          />
          <PasswordInput<AuthChangePassword>
            name="reNewPassword"
            label="Nhập lại mật khẩu"
            control={control}
          />
        </div>

        <div className="w-full flex justify-end mt-6">
          <Button type="submit" variant="red" isLoading={isSubmitting}>
            Xác nhận
          </Button>
        </div>
      </form>
    </Form>
  );
};
