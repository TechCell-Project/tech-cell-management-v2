'use client';

import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AuthLogin } from '@/modules/auth/models';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, useToast } from '@/components/ui';
import { TextInput } from '@/components/common/form-handle';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { loginApi } from '@/modules/auth/apis';
import { useAuthStore } from '@/modules/auth/store';
import { setOneSessionStorage } from '@/utilities/session.util';
import * as yup from 'yup';

const loginValidateSchema: yup.ObjectSchema<AuthLogin> = yup.object({
  emailOrUsername: yup.string().required('Vui lòng nhập thông tin!'),
  password: yup.string().required('Vui lòng nhập thông tin!'),
});

export const SignIn = () => {
  const { toast } = useToast();
  const { fetching, fetched, setUser } = useAuthStore();

  const signInForm = useForm<AuthLogin>({
    resolver: yupResolver(loginValidateSchema),
    defaultValues: new AuthLogin(),
  });

  const {
    formState: { isSubmitting },
    handleSubmit,
    control,
  } = signInForm;

  const { mutateAsync } = useMutation({
    mutationKey: ['auth-login'],
    mutationFn: (values: AuthLogin) => loginApi(values),
    onMutate: () => {
      fetching();
    },
    onSuccess: ({ data }) => {
      setUser(data);
      setOneSessionStorage('user', data);

      toast({
        variant: 'success',
        title: 'Đăng nhập thành công',
        description: 'Chào mừng bạn dến với Techcell Dashboard',
      });
    },
    onError: (error) => {
      console.log(error.message);
      fetched();
      toast({
        variant: 'destructive',
        title: 'Đăng nhập thất bại',
        description: 'Vui lòng kiểm tra lại tài khoản hoặc mật khẩu!',
      });
    },
  });

  const onSubmit: SubmitHandler<AuthLogin> = (data) => mutateAsync(data);

  return (
    <Form {...signInForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput<AuthLogin>
          name="emailOrUsername"
          label="Email hoặc tên người dùng"
          control={control}
          className="mb-5"
        />
        <TextInput<AuthLogin>
          name="password"
          label="Mật khẩu"
          control={control}
          className="mb-4"
          inputAttributes={{
            type: 'password',
          }}
        />

        <p className="text-sm text-right cursor-pointer">Quên mật khẩu</p>

        <Button type="submit" className="w-full my-5" isLoading={isSubmitting}>
          Đăng nhập
        </Button>

        <p className="text-center text-sm font-medium mt-3">
          Trang chủ:{' '}
          <Link href="https://techcell.cloud/" className="font-semibold underline">
            https://techcell.cloud/
          </Link>
        </p>
      </form>
    </Form>
  );
};
