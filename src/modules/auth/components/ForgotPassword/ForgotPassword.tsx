'use client';

import { memo, useMemo, useState } from 'react';
import { DialogDisplay } from '@/components/common/display';
import { Button, Form, useToast } from '@/components/ui';
import { FormReturn, OTPInput, PasswordInput, TextInput } from '@/components/common/form-handle';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { forgotPasswordApi, verifyForgotPasswordApi } from '../../apis';
import { AuthVerifyForgotPassword } from '../../models';
import { forgotPwValidateSchema } from './validate-schema';

export const ForgotPassword = memo(() => {
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();

  const forgotPwForm = useForm<AuthVerifyForgotPassword>({
    resolver: yupResolver(forgotPwValidateSchema),
    defaultValues: new AuthVerifyForgotPassword(),
  });

  const {
    formState: { isSubmitting },
    handleSubmit,
    control,
    getValues,
    setValue,
    trigger,
  } = forgotPwForm;

  const formReturn: FormReturn<AuthVerifyForgotPassword> = useMemo(() => {
    return {
      control,
      getValues,
      setValue,
      trigger,
    };
  }, [control, getValues, setValue, trigger]);

  const { mutateAsync } = useMutation({
    mutationKey: ['auth-forgot-pw'],
    mutationFn: (values: AuthVerifyForgotPassword) => verifyForgotPasswordApi(values),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Thay đổi mật khẩu thành công!',
      });
      setOpen((prev) => !prev);
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Đổi mật khẩu thất bại',
        description: 'Vui lòng thử lại sau',
      });
    },
  });

  const handleGetOtp = (email: string) => {
    forgotPasswordApi(email)
      .then(() =>
        toast({
          variant: 'success',
          title: 'Gửi mã thành công!',
          description: 'Vui lòng kiểm tra tin gửi đến',
        }),
      )
      .catch(() =>
        toast({
          variant: 'destructive',
          title: 'Gửi mã thất bại!',
          description: 'Vui lòng kiểm tra lại email',
        }),
      );
  };

  return (
    <DialogDisplay
      trigger={<p className="text-sm cursor-pointer">Quên mật khẩu?</p>}
      title="Quên mật khẩu"
      open={open}
      setOpen={setOpen}
    >
      <Form {...forgotPwForm}>
        <form onSubmit={handleSubmit((data) => mutateAsync(data))} className="mt-5">
          <div className="flex w-full items-end space-x-2">
            <TextInput<AuthVerifyForgotPassword>
              name="email"
              formReturn={formReturn}
              label="Email"
              className="w-full"
            />
            <Button
              variant="outline"
              type="button"
              onClick={() => handleGetOtp(getValues('email'))}
            >
              Lấy mã OTP
            </Button>
          </div>

          <OTPInput<AuthVerifyForgotPassword>
            name="otpCode"
            label="Mã OTP"
            control={control}
            className="mt-4"
          />

          <PasswordInput<AuthVerifyForgotPassword>
            name="password"
            label="Mật khẩu"
            control={control}
            className="mt-4"
          />

          <PasswordInput<AuthVerifyForgotPassword>
            name="re_password"
            label="Xác nhận mật khẩu"
            control={control}
            className="mt-4"
          />

          <div className="w-full flex justify-end gap-4 mt-7">
            <Button variant="ghost" type="button" onClick={() => setOpen((prev) => !prev)}>
              Đóng
            </Button>
            <Button
              type="submit"
              variant="red"
              isLoading={isSubmitting}
              onClick={(e) => e.stopPropagation()}
            >
              Xác nhận
            </Button>
          </div>
        </form>
      </Form>
    </DialogDisplay>
  );
});

ForgotPassword.displayName = 'ForgotPassword';
