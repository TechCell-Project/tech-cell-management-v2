import { useForm } from 'react-hook-form';
import { AuthUpdate, AuthUpdatePw } from '~auth/models';
import { Button, Form, useToast } from '@/components/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { changePwValidateSchema } from './validate-schema';
import { useMutation } from '@tanstack/react-query';
import { patchMeApi } from '~auth/apis';
import { PasswordInput } from '@/components/common/form-handle';

export const ChangePassword = () => {
  const { toast } = useToast();

  const updatePwForm = useForm<AuthUpdatePw>({
    resolver: yupResolver(changePwValidateSchema),
    defaultValues: {
      oldPassword: '',
      password: '',
      re_password: '',
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = updatePwForm;

  const { mutateAsync } = useMutation({
    mutationFn: (values: Partial<AuthUpdate>) => {
      console.log(values)
      return patchMeApi(values)
    },
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
    <Form {...updatePwForm}>
      <form onSubmit={handleSubmit((data) => mutateAsync(data))}>
        <div className="mt-5 flex flex-col gap-4">
          <PasswordInput<AuthUpdatePw> name="oldPassword" label="Mật khẩu cũ" control={control} />
          <PasswordInput<AuthUpdatePw> name="password" label="Mật khẩu mới" control={control} />
          <PasswordInput<AuthUpdatePw>
            name="re_password"
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