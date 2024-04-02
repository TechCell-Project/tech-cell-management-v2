'use client';

import { TextDisplay } from '@/components/common/display';
import { Button, Form, Separator, useToast } from '@/components/ui';
import { AuthLoginResponse, AuthUpdate, AuthUpdateInfo } from '~auth/models';
import { useAuthStore } from '~auth/store';
import { convertRoleViVN } from '@/utilities/convert.util';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { updateInfoValidateSchema } from './validate-schema';
import { TextInput } from '@/components/common/form-handle';
import { useMutation } from '@tanstack/react-query';
import { getMeApi, patchMeApi } from '~auth/apis';
import { setOneSessionStorage } from '@/utilities/session.util';
import dayjs from 'dayjs';

export const UserInfo = () => {
  const { user: sessionUser, setUser } = useAuthStore();
  const { toast } = useToast();

  const updateInfoForm = useForm<AuthUpdateInfo>({
    resolver: yupResolver(updateInfoValidateSchema),
    defaultValues: {
      firstName: sessionUser?.user.firstName ?? '',
      lastName: sessionUser?.user.lastName ?? '',
      userName: sessionUser?.user.userName ?? '',
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isDirty },
    getValues,
    setValue,
    trigger,
  } = updateInfoForm;

  const formReturn = {
    control,
    getValues,
    setValue,
    trigger,
  };

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
        title: 'Thay đổi thông tin thành công thành công!',
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Thay đổi thông tin thất bại',
        description: 'Vui lòng thử lại sau',
      });
    },
  });

  if (sessionUser) {
    return (
      <>
        <h3 className="mt-5 mb-3 text-[16px] font-semibold">Ảnh đại diện</h3>
        <Separator className="my-6" />

        <h3 className="mt-5 mb-3 text-[16px] font-semibold">Người dùng</h3>
        <div className="grid grid-cols-2 gap-x-5 gap-y-1">
          <TextDisplay label="Email" content={sessionUser.user.email} />
          <TextDisplay label="Chức vụ" content={convertRoleViVN[sessionUser.user.role]} />
          <TextDisplay
            label="Trạng thái TK"
            content={sessionUser.user.block?.isBlocked ? 'Bị chặn' : 'Hoạt động'}
          />
        </div>
        <Separator className="my-6" />

        <h3 className="mt-5 mb-3 text-[16px] font-semibold">Khác</h3>
        <div className="grid grid-cols-2 gap-x-5 gap-y-1">
          <TextDisplay
            label="Ngày tạo"
            content={dayjs(sessionUser.user.createdAt).format('DD/MM/YYYY h:mm A')}
          />
          <TextDisplay
            label="Ngày cập nhật"
            content={dayjs(sessionUser.user.updatedAt).format('DD/MM/YYYY h:mm A')}
          />
        </div>
        <Separator className="my-6" />

        <Form {...updateInfoForm}>
          <form
            onSubmit={handleSubmit((data) => {
              const values: Partial<AuthUpdate> = {};
              for (const key in data) {
                if ((data as any)[key] !== (sessionUser.user as any)[key]) {
                  (values as any)[key] = (data as any)[key];
                }
              }
              mutateAsync(values);
            })}
          >
            <h3 className="mt-5 mb-3 text-[16px] font-semibold">Chỉnh sửa</h3>
            <div className="grid grid-cols-2 gap-x-5 gap-y-4">
              <TextInput<AuthUpdateInfo> label="Họ" name="lastName" formReturn={formReturn} />
              <TextInput<AuthUpdateInfo> label="Tên" name="firstName" formReturn={formReturn} />
              <TextInput<AuthUpdateInfo>
                label="Tên người dùng"
                name="userName"
                formReturn={formReturn}
              />
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
