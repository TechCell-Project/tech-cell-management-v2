import { DialogDisplay } from '@/components/common/display';
import { Button, Form, useToast } from '@/components/ui';
import { useOrderStore } from '@/modules/order-mnt/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { ReactNode, memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  OrderOrderStatusEnum,
  UpdateOrderStatusDto,
  UpdateOrderStatusDtoOrderStatusEnum,
  UserRoleEnum,
} from '@techcell/node-sdk';
import { ProcessShipping } from '@/constants/utils';
import { TextareaInput } from '@/components/common/form-handle';
import { updateOrderStatusSchema } from './validate-schema';
import { MoveRight } from 'lucide-react';
import { convertOrderStatus } from '@/utilities/convert.util';
import { useMutation } from '@tanstack/react-query';
import { getOneOrderApi, patchOneOrderApi } from '@/modules/order-mnt/apis';
import { useRouter } from 'next/navigation';
import { Routes } from '@/constants/enum';
import { useAuthStore } from '@/modules/auth/store';

const OrderUpdateConfirm = ({ trigger }: { trigger: ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);

  const { user } = useAuthStore();
  const order = useOrderStore((state) => state.order);
  const getOneSuccess = useOrderStore((state) => state.getOneSuccess);

  const { toast } = useToast();
  const router = useRouter();

  const newStatus = ProcessShipping.findIndex((process) => process.label === order?.orderStatus);

  const updateStatusOrderForm = useForm<UpdateOrderStatusDto>({
    resolver: yupResolver(updateOrderStatusSchema),
    values: {
      orderStatus: ProcessShipping[newStatus + 1]
        .label as unknown as UpdateOrderStatusDtoOrderStatusEnum,
      note: '',
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = updateStatusOrderForm;

  const { mutateAsync } = useMutation({
    mutationFn: (values: UpdateOrderStatusDto) => patchOneOrderApi(order?._id as string, values),
    onSuccess: () => {
      getOneOrderApi(order?._id as string)
        .then(({ data }) => {
          getOneSuccess(data);
          setOpen(false);
          setTimeout(() => {
            window.location.reload();
          }, 500);
        })
        .catch(() => {
          router.push(Routes.MntOrder);
        });
      toast({
        variant: 'success',
        title: 'Đổi trạng thái đơn hàng thành công!',
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Đổi trạng thái đơn hàng thất bại!',
        description: 'Vui lòng thử lại sau',
      });
    },
  });

  return (
    <DialogDisplay
      trigger={trigger}
      open={open}
      setOpen={setOpen}
      title="Cập nhật đơn hàng"
      classContent="max-w-xl"
    >
      <Form {...updateStatusOrderForm}>
        <form
          onSubmit={handleSubmit((data) => {
            if (
              user?.user.role !== UserRoleEnum.Sales &&
              order?.orderStatus === OrderOrderStatusEnum.Pending
            ) {
              toast({
                variant: 'destructive',
                content: 'Tài khoản không có quyền',
                description: 'Hãy dùng tài khoản nhân viên bán hàng!',
              });
              return;
            }
            return mutateAsync(data);
          })}
          className="mt-3"
        >
          <div className="flex gap-3 items-center mb-3">
            <p>Trạng thái đơn hàng: </p>
            <b>{convertOrderStatus[order?.orderStatus as OrderOrderStatusEnum]}</b>
            <MoveRight />
            <b>{convertOrderStatus[ProcessShipping[newStatus + 1].label]}</b>
          </div>
          <TextareaInput<UpdateOrderStatusDto> label="Ghi chú" name="note" />

          <div className="w-full flex justify-end gap-4 mt-7">
            <Button variant="ghost" type="button" onClick={() => setOpen(false)}>
              Quay lại
            </Button>

            <Button variant="red" type="submit" isLoading={isSubmitting}>
              Lưu
            </Button>
          </div>
        </form>
      </Form>
    </DialogDisplay>
  );
};

export default memo(OrderUpdateConfirm);
