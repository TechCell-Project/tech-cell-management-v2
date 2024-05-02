import { DialogDisplay } from '@/components/common/display';
import { Button, Form, useToast } from '@/components/ui';
import { useOrderStore } from '~order-mnt/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { ReactNode, memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  OrderOrderStatusEnum,
  SerialNumber,
  UpdateOrderStatusDto,
  UpdateOrderStatusDtoOrderStatusEnum,
  UpdateSerialNumberDto,
  UserRoleEnum,
} from '@techcell/node-sdk';
import { ProcessShipping } from '@/constants/utils';
import { MultiSelectInput, TextareaInput } from '@/components/common/form-handle';
import { updateOrderStatusSchema } from './validate-schema';
import { MoveRight } from 'lucide-react';
import { convertOrderStatus } from '@/utilities/convert.util';
import { useMutation, useQueries, useQuery } from '@tanstack/react-query';
import { getOneOrderApi, patchOneOrderApi } from '~order-mnt/apis';
import { useRouter } from 'next/navigation';
import { Routes } from '@/constants/enum';
import { useAuthStore } from '~auth/store';
import { getListSkuSerialNumbersApi } from '@/modules/sku-mnt/apis';
import { getSearchParams } from '@/utilities/func.util';
import { PaginationResponse, SearchRequest } from '@/common/model';

type OrderUpdateConfirmProps = {
  trigger: ReactNode;
  newStatus: number;
  action?: 'change-action' | 'cancel-action';
};

const OrderUpdateConfirm = ({
  trigger,
  newStatus,
  action = 'change-action',
}: OrderUpdateConfirmProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [listSerials, setListSerials] = useState<any[]>([]);

  const { user } = useAuthStore();
  const order = useOrderStore((state) => state.order);
  const getOneSuccess = useOrderStore((state) => state.getOneSuccess);

  const { toast } = useToast();
  const router = useRouter();

  const updateStatusOrderForm = useForm<UpdateOrderStatusDto>({
    resolver: yupResolver(updateOrderStatusSchema),
    values: {
      orderStatus:
        action === 'change-action'
          ? (ProcessShipping[newStatus + 1].label as unknown as UpdateOrderStatusDtoOrderStatusEnum)
          : UpdateOrderStatusDtoOrderStatusEnum.Canceled,
      note: '',
      updateSerialNumbers:
        order?.products.map((product) => ({
          skuId: product.skuId,
          serialNumbers: product.serialNumber,
        })) ?? [],
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    getValues,
  } = updateStatusOrderForm;

  // useEffect(() => {
  //   if (order) {
  //     order.products.map((product) => {
  //       getListSkuSerialNumbersApi(product.skuId, getSearchParams(new SearchRequest(1, 100))).then(
  //         ({ data }) => setListSerials((prev) => [...prev, data]),
  //       );
  //     });
  //   }
  // }, [order]);

  // console.log(listSerials)

  // const combinedQueries = useQueries({
  //   queries: (watch('updateSerialNumbers') as any)?.map((product: UpdateSerialNumberDto) => ({
  //     queryKey: ['sku-serial-numbers', product.skuId],
  //     queryFn: () =>
  //       getListSkuSerialNumbersApi(product.skuId, getSearchParams(new SearchRequest(1, 100))),
  //   })),
  //   combine: (results) => {
  //     return {
  //       data: results.map(
  //         (result: any) => (result.data.data as PaginationResponse<SerialNumber>).data,
  //       ),
  //       pending: results.some((result) => result.isPending),
  //       count: results.length,
  //     };
  //   },
  // });

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
        title:
          action === 'change-action'
            ? 'Đổi trạng thái đơn hàng thành công!'
            : 'Huỷ đơn hàng thành công!',
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
          {order?.orderStatus !== OrderOrderStatusEnum.Pending && (
            <div className="flex gap-3 items-center mb-3">
              <p>Trạng thái đơn hàng: </p>
              <b>{convertOrderStatus[order?.orderStatus as OrderOrderStatusEnum]}</b>
              <MoveRight />
              <b>{convertOrderStatus[ProcessShipping[newStatus + 1].label]}</b>
            </div>
          )}
          {order?.orderStatus === OrderOrderStatusEnum.Preparing &&
            getValues('updateSerialNumbers')?.map((product) => (
              <div key={product.skuId}>
                {/* <MultiSelectInput<UpdateOrderStatusDto> label=''/> */}
              </div>
            ))}
          <TextareaInput<UpdateOrderStatusDto>
            label={action === 'change-action' ? 'Ghi chú' : 'Lí do huỷ'}
            name="note"
          />

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
