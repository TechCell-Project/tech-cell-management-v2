'use client';

import { useQuery } from '@tanstack/react-query';
import { useOrderStore } from '../../store';
import { getOneOrderApi } from '../../apis';
import { Button, Separator, useToast } from '@/components/ui';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import OrderUpdateInfo from './OrderUpdateInfo';
import OrderUpdateInvoice from './OrderUpdateInvoice';
import { Routes } from '@/constants/enum';
import OrderUpdateProcess from './OrderUpdateProcess';
import { OrderOrderStatusEnum } from '@techcell/node-sdk';
import OrderUpdateConfirm from './OrderUpdateConfirm';
import { ProcessShipping } from '@/constants/utils';
import { convertOrderStatus } from '@/utilities/convert.util';

export const OrderUpdate = ({ id }: { id: string }) => {
  const { order, getOneSuccess, resetOne } = useOrderStore();

  const { toast } = useToast();
  const { theme } = useTheme();
  const router = useRouter();

  const {
    data: dataDetails,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ['order-update', id],
    queryFn: () => getOneOrderApi(id),
  });

  const newStatus = useMemo(() => {
    return ProcessShipping.findIndex((process) => process.label === order?.orderStatus);
  }, [order]);

  if (dataDetails && isSuccess) {
    getOneSuccess(dataDetails.data);
  }

  if (isError) {
    toast({
      variant: 'destructive',
      title: 'Không tìm thấy đơn hàng!',
      description: 'Vui lòng thử lại sau',
    });
    router.push(Routes.MntOrder);
  }

  useEffect(() => {
    return () => {
      resetOne();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`rounded-md border py-5 px-6 ${theme === 'light' && 'bg-white'}`}>
      <div className="grid grid-cols-3 gap-x-5 gap-y-3">
        <div className="col-span-2">
          <OrderUpdateInfo />
        </div>
        <div className="col-span-1 border-bg h-full border-s-[1px] pl-8">
          <OrderUpdateInvoice />
        </div>
      </div>
      <Separator className="my-7" />

      <OrderUpdateProcess />

      <div className="w-full flex justify-end gap-4 mt-7">
        <Button variant="ghost" type="button" onClick={() => router.back()}>
          Quay lại
        </Button>
        {order?.orderStatus === OrderOrderStatusEnum.Pending && (
          <OrderUpdateConfirm
            trigger={
              <Button variant="red" type="submit">
                Từ chối
              </Button>
            }
            newStatus={newStatus}
            action="cancel-action"
          />
        )}

        {order?.orderStatus !== OrderOrderStatusEnum.Completed &&
          order?.orderStatus !== OrderOrderStatusEnum.Failed &&
          order?.orderStatus !== OrderOrderStatusEnum.Canceled &&
          order?.orderStatus !== OrderOrderStatusEnum.Shipping && (
            <OrderUpdateConfirm
              trigger={
                <Button variant="red" type="submit">
                  Tiến hành{' '}
                  {convertOrderStatus?.[ProcessShipping[newStatus + 1].label].toLowerCase()}
                </Button>
              }
              newStatus={newStatus}
            />
          )}
      </div>
    </div>
  );
};
