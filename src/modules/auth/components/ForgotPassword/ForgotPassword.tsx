'use client';

import { memo, useMemo, useState } from 'react';
import { DialogDisplay } from '@/components/common/display';
import { Button, Form, useToast } from '@/components/ui';
import { FormReturn, PasswordInput, TextInput } from '@/components/common/form-handle';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthResetPassword } from '~auth/models';
import { forgotPwValidateSchema } from './validate-schema';

export const ForgotPassword = memo(() => {
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();

  const forgotPwForm = useForm<AuthResetPassword>({
    resolver: yupResolver(forgotPwValidateSchema),
    defaultValues: new AuthResetPassword(),
  });

  const {
    formState: { isSubmitting },
    handleSubmit,
    control,
    getValues,
    setValue,
    trigger,
  } = forgotPwForm;

  const formReturn: FormReturn<AuthResetPassword> = useMemo(() => {
    return {
      control,
      getValues,
      setValue,
      trigger,
    };
  }, [control, getValues, setValue, trigger]);

  return (
    <DialogDisplay
      trigger={<p className="text-sm cursor-pointer">Quên mật khẩu?</p>}
      title="Quên mật khẩu"
      open={open}
      setOpen={setOpen}
    >
      <Form {...forgotPwForm}>
        <form onSubmit={handleSubmit((data) => {})} className="mt-5">
          {/* <div className="flex w-full items-baseline space-x-2">
            <TextInput<AuthResetPassword>
              name="email"
              formReturn={formReturn}
              label="Email"
              className="w-full relative mt-3 [&>label]:absolute [&>label]:top-[-18px]"
            />
            <Button
              variant="outline"
              type="button"
              onClick={() => handleGetOtp(getValues('email'))}
              isLoading={loadingGetOtp}
            >
              Lấy mã OTP
            </Button>
          </div>

          <PasswordInput<AuthResetPassword>
            name="password"
            label="Mật khẩu"
            control={control}
            className="mt-4"
          />

          <PasswordInput<AuthResetPassword>
            name="re_password"
            label="Xác nhận mật khẩu"
            control={control}
            className="mt-4"
          /> */}

          <div className="w-full flex justify-end gap-4 mt-7">
            <Button variant="ghost" type="button" onClick={() => setOpen((prev) => !prev)}>
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
