'use client';

import { memo, useState } from 'react';
import { DialogDisplay } from '@/components/common/display';
import { Button, Form, useToast } from '@/components/ui';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthForgotPw } from '~auth/models';
import { forgotPwValidateSchema } from './validate-schema';
import { Routes } from '@/constants/enum';
import { TextInput } from '@/components/common/form-handle';
import { useMutation } from '@tanstack/react-query';
import { forgotPasswordApi } from '../../apis';

export const ForgotPassword = memo(() => {
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();

  const currentUrl = typeof window !== 'undefined' && window.location.origin + Routes.ResetPassword;

  const forgotPwForm = useForm<AuthForgotPw>({
    resolver: yupResolver(forgotPwValidateSchema),
    defaultValues: new AuthForgotPw(currentUrl as string),
  });

  const {
    formState: { isSubmitting },
    handleSubmit,
    reset,
  } = forgotPwForm;

  const { mutateAsync } = useMutation({
    mutationFn: (values: AuthForgotPw) => forgotPasswordApi(values),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Thành công',
        description: 'Vui lòng kiểm tra email!',
      });
      
      reset();
      setOpen(false);
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Thất bại',
        description: 'Vui lòng thử lại sau!',
      });
    },
  });

  return (
    <DialogDisplay
      trigger={<p className="text-sm cursor-pointer">Quên mật khẩu?</p>}
      title="Quên mật khẩu"
      open={open}
      setOpen={setOpen}
    >
      <Form {...forgotPwForm}>
        <form onSubmit={handleSubmit((data) => mutateAsync(data))} className="mt-5">
          <TextInput<AuthForgotPw> name="email" label="Email" className="mb-4" />

          <div className="w-full flex justify-end gap-4 mt-7">
            <Button variant="ghost" type="button" onClick={() => setOpen(false)}>
              Đóng
            </Button>
            <Button type="submit" variant="red" isLoading={isSubmitting}>
              Xác nhận
            </Button>
          </div>
        </form>
      </Form>
    </DialogDisplay>
  );
});

ForgotPassword.displayName = 'ForgotPassword';
