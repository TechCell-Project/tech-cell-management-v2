import { ReactNode, memo, useState } from 'react';
import { User, UserUpdate } from '../../models';
import { DialogDisplay, TextDisplay } from '@/components/common/display';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { changeRoleValidateSchema } from './validate-schema';
import { Button, Form, useToast } from '@/components/ui';
import { SelectInput } from '@/components/common/form-handle';
import { CHANGE_ROLE_OPTIONS } from '@/constants/options';
import { convertRoleViVN } from '@/utilities/convert.util';
import { useMutation } from '@tanstack/react-query';
import { patchOneUserApi } from '../../apis';
import { useUserStore } from '../../store';

type UserChangeRoleProps = {
  user: User;
  trigger: ReactNode | string;
};

type ChangeRoleForm = Pick<UserUpdate, 'role'>;

export const UserChangeRole = memo(({ trigger, user }: UserChangeRoleProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const { toast } = useToast();
  const { updateUserInList } = useUserStore();

  const changeRoleForm = useForm<ChangeRoleForm>({
    resolver: yupResolver(changeRoleValidateSchema),
    defaultValues: {
      role: '',
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = changeRoleForm;

  const { mutateAsync } = useMutation({
    mutationFn: (values: Partial<UserUpdate>) => patchOneUserApi(user._id, values),
    onSuccess: (response) => {
      toast({
        variant: 'success',
        title: 'Thay đổi chức vụ thành công!',
      });
      updateUserInList(response.data);
      setOpen(false);
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Thay đổi chức vụ thất bại!',
        description: 'Vui lòng thử lại sau',
      });
    },
  });

  return (
    <DialogDisplay trigger={trigger} title="Đổi chức vụ" open={open} setOpen={setOpen}>
      <Form {...changeRoleForm}>
        <form>
          <TextDisplay
            label="Chức vụ hiện tại"
            content={convertRoleViVN[user.role]}
            className="mt-5 mb-3"
          />

          <SelectInput<ChangeRoleForm> label="Chức vụ" name="role" options={CHANGE_ROLE_OPTIONS} />

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

UserChangeRole.displayName = 'UserChangeRole';
