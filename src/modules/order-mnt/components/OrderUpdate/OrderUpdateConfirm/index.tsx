import { DialogDisplay } from '@/components/common/display';
import { Button, Form, useToast } from '@/components/ui';
import { useOrderStore } from '~order-mnt/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { ReactNode, memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  OrderOrderStatusEnum,
  SerialNumber,
  UpdateOrderStatusDto,
  UpdateOrderStatusDtoOrderStatusEnum,
  UpdateSerialNumberDto,
} from '@techcell/node-sdk';
import { ProcessShipping } from '@/constants/utils';
import { MultiSelectInput, TextareaInput } from '@/components/common/form-handle';
import {
  updateOrderStatusSchema,
  updateOrderStatusWithSerialNumberSchema,
} from './validate-schema';
import { MoveRight } from 'lucide-react';
import { convertOrderStatus } from '@/utilities/convert.util';
import { useMutation, useQueries } from '@tanstack/react-query';
import { getOneOrderApi, patchOneOrderApi } from '~order-mnt/apis';
import { useRouter } from 'next/navigation';
import { Routes } from '@/constants/enum';
import { getListSkuSerialNumbersApi } from '@/modules/sku-mnt/apis';
import { getSearchParams } from '@/utilities/func.util';
import { PaginationResponse, SearchRequest } from '@/common/model';
import Image from 'next/image';

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

  const order = useOrderStore((state) => state.order);
  const getOneSuccess = useOrderStore((state) => state.getOneSuccess);

  const { toast } = useToast();
  const router = useRouter();

  const updateStatusOrderForm = useForm<UpdateOrderStatusDto>({
    resolver: yupResolver(
      order?.orderStatus === OrderOrderStatusEnum.Preparing
        ? updateOrderStatusWithSerialNumberSchema
        : updateOrderStatusSchema,
    ),
    values: {
      orderStatus:
        action === 'change-action'
          ? (ProcessShipping[newStatus + 1].label as unknown as UpdateOrderStatusDtoOrderStatusEnum)
          : UpdateOrderStatusDtoOrderStatusEnum.Failed,
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

  const combinedQueries = useQueries({
    queries: (getValues('updateSerialNumbers') as unknown as UpdateSerialNumberDto[])?.map(
      (product: UpdateSerialNumberDto) => ({
        queryKey: ['sku-serial-numbers', product.skuId],
        queryFn: () =>
          getListSkuSerialNumbersApi(product.skuId, getSearchParams(new SearchRequest(1, 50))),
      }),
    ),
    combine: (results) => {
      return {
        listSerials: results.map(
          (result: any) => (result.data?.data as PaginationResponse<SerialNumber>)?.data,
        ),
        pending: results.some((result) => result.isPending),
      };
    },
  });

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
      classContent="max-w-2xl"
    >
      <Form {...updateStatusOrderForm}>
        <form
          onSubmit={handleSubmit((data) => {
            if (order?.orderStatus !== OrderOrderStatusEnum.Preparing) {
              delete data.updateSerialNumbers;
            }
            // if(data.updateSerialNumbers) {
            //   const matchSerials = data.updateSerialNumbers.map((serial, i) => {
            //     if(serial.serialNumbers.length !== order?.products[i].quantity) {

            //     }
            //   })
            // }
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
            getValues('updateSerialNumbers')?.map((product, i) => (
              <div key={product.skuId} className="py-3 grid grid-cols-6 gap-x-5 gap-y-3">
                <div className="col-span-1">
                  <Image
                    width={90}
                    height={90}
                    src={order?.products[i]?.image?.url ?? 'https://github.com/shadcn.png'}
                    alt="product-image"
                    className="rounded"
                  />
                </div>
                <div className="col-span-5">
                  <h5 className="font-semibold text-sm">
                    {order?.products[i].productName}, x{order?.products[i].quantity}
                  </h5>
                  <MultiSelectInput<UpdateOrderStatusDto, SerialNumber>
                    label="Số serial"
                    name={`updateSerialNumbers.${i}.serialNumbers`}
                    options={combinedQueries?.listSerials[i]}
                    displayLabel="number"
                    displayValue="number"
                    displayType="list"
                    elementLimit={order?.products[i].quantity}
                  />
                </div>
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
