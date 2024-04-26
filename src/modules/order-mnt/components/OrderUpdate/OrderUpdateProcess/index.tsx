import { useOrderStore } from '@/modules/order-mnt/store';
import { OrderOrderStatusEnum } from '@techcell/node-sdk';

const ProcessShipping = [
  {label: OrderOrderStatusEnum.Pending, step: 1},
  // {label: OrderOrderStatusEnum., step: 1},
  // {label: OrderOrderStatusEnum.Pending, step: 1},
  // {label: OrderOrderStatusEnum.Pending, step: 1},
  // {label: OrderOrderStatusEnum.Pending, step: 1},
  // {label: OrderOrderStatusEnum.Pending, step: 1},
]

const OrderUpdateProcess = () => {
  const { order } = useOrderStore();

  return (
    order && (
      <>
        <h3 className="mb-2 font-semibold">Đơn hàng</h3>
      </>
    )
  );
};

export default OrderUpdateProcess;
