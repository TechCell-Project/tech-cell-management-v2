import { ReactNode, memo, useState } from 'react';
import { User, UserBlock, UserUpdate } from '../../models';
import { DialogDisplay } from '@/components/common/display';
import { useForm } from 'react-hook-form';
import { Button, Form, Textarea, useToast } from '@/components/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { blockOrUnbValidateSchema } from './validate-schema';
import { useMutation } from '@tanstack/react-query';
import { patchOneUserApi } from '../../apis';
import { usePathname, useRouter } from 'next/navigation';
import { BlockUserDtoActionEnum } from '@techcell/node-sdk';
import { TextareaInput } from '@/components/common/form-handle';

type UserBlockOrUnblockProps = {
  user: User;
  trigger: ReactNode | string;
};

export const UserBlockOrUnblock = memo(({ trigger, user }: UserBlockOrUnblockProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  const blockOrUnblock = user.block?.isBlocked
    ? BlockUserDtoActionEnum.Unblock
    : BlockUserDtoActionEnum.Block;

  const blockOrUnblockForm = useForm({
    resolver: yupResolver(blockOrUnbValidateSchema),
    defaultValues: {
      block: new UserBlock(blockOrUnblock),
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = blockOrUnblockForm;

  const { mutateAsync } = useMutation({
    mutationFn: (values: Partial<UserUpdate>) => patchOneUserApi(user._id, values),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: `${blockOrUnblock === BlockUserDtoActionEnum.Unblock ? 'Bỏ chặn' : 'Chặn'} ${
          user.email
        } thành công`,
      });

      router.replace(pathname);
      setOpen(false);
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: `${blockOrUnblock === BlockUserDtoActionEnum.Unblock ? 'Bỏ chặn' : 'Chặn'} thất bại`,
        description: 'Vui lòng thử lại sau',
      });
    },
  });

  return (
    <DialogDisplay trigger={trigger} title={trigger} open={open} setOpen={setOpen}>
      <Textarea placeholder="Type your message here." id="message-2" />
      <Form {...blockOrUnblockForm}>
        <form className="mt-3">
          <TextareaInput label="Lý do" name="block.activityLogs.reason" isDebounce/>

          <div className="w-full flex justify-end gap-4 mt-7">
            <Button variant="ghost" type="button" onClick={() => setOpen(false)}>
              Đóng
            </Button>
            <Button
              onClick={handleSubmit((data) => mutateAsync(data as Partial<UserUpdate>))}
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

UserBlockOrUnblock.displayName = 'UserBlockOrUnblock';
