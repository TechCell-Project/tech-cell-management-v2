'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useOrderStore } from '../../store';
import { getOneOrderApi, patchOneOrderApi } from '../../apis';
import { OrderUpdateStatus } from '../../models';
import { Button, Form, Separator, useToast } from '@/components/ui';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import OrderUpdateInfo from './OrderUpdateInfo';
import OrderUpdateInvoice from './OrderUpdateInvoice';
import { Routes } from '@/constants/enum';
import OrderUpdateProcess from './OrderUpdateProcess';

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

  const { mutateAsync } = useMutation({
    mutationFn: (values: OrderUpdateStatus) => patchOneOrderApi(id, values),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Cập nhật thành công!',
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Cập nhật thất bại!',
        description: 'Vui lòng thử lại sau',
      });
    },
  });

  const updateOrderForm = useForm({
    values: order,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = updateOrderForm;

  useEffect(() => {
    return () => {
      resetOne();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    order && (
      <Form {...updateOrderForm}>
        <form
          className={`rounded-md border py-5 px-6 ${theme === 'light' && 'bg-white'}`}
          onSubmit={handleSubmit((data) => {})}
        >
          <div className="grid grid-cols-3 gap-x-5 gap-y-3">
            <div className="col-span-2">
              <OrderUpdateInfo />
            </div>
            <div className='col-span-1 border-bg h-full border-s-[1px] pl-8'>
              <OrderUpdateInvoice />
            </div>
          </div>
          <Separator className="my-7" />

          <OrderUpdateProcess />

          <div className="w-full flex justify-end gap-4 mt-7">
            <Button variant="ghost" type="button" onClick={() => router.back()}>
              Quay lại
            </Button>
            <Button variant="red" type="submit" isLoading={isSubmitting}>
              Lưu thay đổi
            </Button>
          </div>
        </form>
      </Form>
    )
  );
};
