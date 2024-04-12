import { memo, useState } from 'react';
import { UserActionProps, UserBlock, UserUpdate } from '../../models';
import { DialogDisplay, TextDisplay } from '@/components/common/display';
import { useForm } from 'react-hook-form';
import { Button, Form, useToast } from '@/components/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { blockOrUnbValidateSchema } from './validate-schema';
import { useMutation } from '@tanstack/react-query';
import { patchOneUserApi } from '../../apis';
import { usePathname, useRouter } from 'next/navigation';
import { BlockUserDtoActionEnum } from '@techcell/node-sdk';
import { SelectInput, TextareaInput } from '@/components/common/form-handle';
import { convertBlockAction } from '@/utilities/convert.util';
import { REASON_BLOCK_OPTIONS } from '@/constants/options';

type BlType = { block: UserBlock };

export const UserBlockOrUnblock = memo(({ trigger, user }: UserActionProps) => {
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
    watch,
    reset,
  } = blockOrUnblockForm;

  const { mutateAsync } = useMutation({
    mutationFn: (values: Partial<UserUpdate>) => patchOneUserApi(user._id, values),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: `${convertBlockAction[blockOrUnblock]} ${user.email} thành công`,
      });

      reset();
      router.replace(pathname);
      setOpen(false);
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: `${convertBlockAction[blockOrUnblock]} thất bại`,
        description: 'Vui lòng thử lại sau',
      });
    },
  });

  return (
    <DialogDisplay trigger={trigger} title={trigger} open={open} setOpen={setOpen}>
      <Form {...blockOrUnblockForm}>
        <form className="mt-3">
          {blockOrUnblock === BlockUserDtoActionEnum.Block ? (
            <>
              <SelectInput<BlType>
                label="Lý do"
                name="block.activityLogs.reason"
                options={REASON_BLOCK_OPTIONS}
              />
              {watch('block.activityLogs.reason') === 'other' && (
                <TextareaInput<BlType> label="Ghi rõ" name="block.activityLogs.note" className="mt-3" />
              )}
            </>
          ) : (
            <>
              <TextDisplay
                label="Tài khoản bị chặn do"
                content={
                  REASON_BLOCK_OPTIONS.find(
                    (item) =>
                      item.value ===
                      (user?.block?.activityLogs[user?.block?.activityLogs.length - 1]
                        .reason as string),
                  )?.label as string
                }
                className="mb-3 flex-wrap"
              />
              <TextareaInput<BlType> label="Lý do" name="block.activityLogs.reason" />
            </>
          )}

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
