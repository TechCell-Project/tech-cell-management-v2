'use client';

import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { TextDisplay, TooltipDisplay } from '@/components/common/display';
import { Button, Form, Separator, useToast } from '@/components/ui';
import { convertRoleViVN } from '@/utilities/convert.util';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateInfoValidateSchema } from './validate-schema';
import { setOneSessionStorage } from '@/utilities/session.util';
import { TextInput } from '@/components/common/form-handle';
import { useMutation } from '@tanstack/react-query';
import { AuthLoginResponse, AuthUpdate, AuthUpdateInfo } from '~auth/models';
import { useAuthStore } from '~auth/store';
import { getMeApi, patchMeApi } from '~auth/apis';
import { CircleCheckBig } from 'lucide-react';
import { FORMAT_DATE } from '@/constants/utils';
import { getFieldChanges } from '@/utilities/func.util';
import { UserAvatar } from './UserAvatar';

export const UserInfo = () => {
  const { user: sessionUser, setUser } = useAuthStore();
  const { toast } = useToast();

  const updateInfoForm = useForm<AuthUpdateInfo>({
    resolver: yupResolver(updateInfoValidateSchema),
    defaultValues: {
      firstName: sessionUser?.user.firstName ?? '',
      lastName: sessionUser?.user.lastName ?? '',
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = updateInfoForm;

  const { mutateAsync } = useMutation({
    mutationFn: (values: Partial<AuthUpdate>) => patchMeApi(values),
    onSuccess: () => {
      getMeApi()
        .then(({ data }) => {
          const userSave: AuthLoginResponse = { ...(sessionUser as AuthLoginResponse), user: data };
          setUser(userSave);
          setOneSessionStorage<AuthLoginResponse>('user', userSave);
        })
        .catch(() => {
          throw new Error();
        });

      toast({
        variant: 'success',
        title: 'Thay đổi thông tin thành công!',
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Thay đổi thông tin thất bại!',
        description: 'Vui lòng thử lại sau',
      });
    },
  });

  if (sessionUser) {
    return (
      <>
        <h3 className="mt-5 mb-3 text-[16px] font-semibold">Ảnh đại diện</h3>
        <UserAvatar />
        <Separator className="my-6" />

        <div className="mt-5 mb-3 flex justify-start items-center gap-4">
          <h3 className="text-[16px] font-semibold">Người dùng</h3>
          {sessionUser.user.emailVerified && (
            <TooltipDisplay
              trigger={<CircleCheckBig className="h-[1rem] w-[1rem]" color="#ee4949" />}
              content="Tài khoản đã xác nhận email"
            />
          )}
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-1">
          <TextDisplay label="Email" content={sessionUser.user.email} />
          <TextDisplay label="Chức vụ" content={convertRoleViVN[sessionUser.user.role]} />
          <TextDisplay
            label="Trạng thái"
            content={sessionUser.user.block?.isBlocked ? 'Bị chặn' : 'Hoạt động'}
          />
        </div>
        <Separator className="my-6" />

        <h3 className="mt-5 mb-3 text-[16px] font-semibold">Khác</h3>
        <div className="grid grid-cols-2 gap-x-5 gap-y-1">
          <TextDisplay
            label="Ngày tạo"
            content={dayjs(sessionUser.user.createdAt).format(FORMAT_DATE)}
          />
          <TextDisplay
            label="Ngày cập nhật"
            content={dayjs(sessionUser.user.updatedAt).format(FORMAT_DATE)}
          />
        </div>
        <Separator className="my-6" />

        <Form {...updateInfoForm}>
          <form
            onSubmit={handleSubmit((data) => {
              const values = getFieldChanges(data, sessionUser.user);
              return mutateAsync(values);
            })}
          >
            <h3 className="mt-5 mb-3 text-[16px] font-semibold">Chỉnh sửa</h3>
            <div className="grid grid-cols-2 gap-x-5 gap-y-4">
              <TextInput<AuthUpdateInfo> label="Họ" name="lastName" />
              <TextInput<AuthUpdateInfo> label="Tên" name="firstName" />
            </div>

            <div className="w-full flex justify-end mt-6">
              <Button type="submit" variant="red" isLoading={isSubmitting} disabled={!isDirty}>
                Xác nhận
              </Button>
            </div>
          </form>
        </Form>
      </>
    );
  }
};
