'use client';

import { Button, Form, useToast } from '@/components/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { resetPwValidateSchema } from './validate.schema';
import { AuthResetPassword } from '../../models';
import { useMutation } from '@tanstack/react-query';
import { resetPasswordApi } from '../../apis';
import { Routes } from '@/constants/enum';
import { PasswordInput } from '@/components/common/form-handle';

export const ResetPassword = () => {
  const { toast } = useToast();

  const router = useRouter();
  const searchParams = useSearchParams();
  const hash = searchParams.get('hash');

  const resetPwForm = useForm<AuthResetPassword>({
    resolver: yupResolver(resetPwValidateSchema),
    defaultValues: new AuthResetPassword(hash as string),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = resetPwForm;

  const { mutateAsync } = useMutation({
    mutationFn: (values: AuthResetPassword) => resetPasswordApi(values),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Tạo lại mật khẩu thành công',
        description: 'Hãy đăng nhập lại!',
      });
      router.push(Routes.SignIn);
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Tạo lại mật khẩu thất bại',
        description: 'Vui lòng thử lại sau!',
      });
    },
  });

  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-lg dark:text-white mb-1">
        Tạo lại mật khẩu
      </h1>

      <Form {...resetPwForm}>
        <form onSubmit={handleSubmit((data) => mutateAsync(data))}>
          <PasswordInput<AuthResetPassword> label="Mật khẩu" name="password" className="mb-4" />

          <Button type="submit" className="w-full mt-4" isLoading={isSubmitting} variant="red">
            Xác nhận
          </Button>
        </form>
      </Form>
    </div>
  );
};
