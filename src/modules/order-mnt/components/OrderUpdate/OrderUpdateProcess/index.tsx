import { quickSandFont } from '@/components/config';
import { useOrderStore } from '@/modules/order-mnt/store';
import { convertOrderStatus } from '@/utilities/convert.util';
import { OrderOrderStatusEnum } from '@techcell/node-sdk';
import { useCallback, useMemo } from 'react';
import { Stepper, Step } from 'react-form-stepper';

const ProcessShipping = [
  { label: OrderOrderStatusEnum.Pending, step: 1 },
  { label: OrderOrderStatusEnum.Confirmed, step: 2 },
  { label: OrderOrderStatusEnum.Preparing, step: 3 },
  { label: OrderOrderStatusEnum.Prepared, step: 4 },
  { label: OrderOrderStatusEnum.Shipping, step: 5 },
  { label: OrderOrderStatusEnum.Completed, step: 6 },
];

const ProcessShippingCancel = [
  { label: OrderOrderStatusEnum.Pending, step: 1 },
  { label: OrderOrderStatusEnum.Canceled, step: 2 },
];

const ProcessShippingFailed = [
  { label: OrderOrderStatusEnum.Pending, step: 1 },
  { label: OrderOrderStatusEnum.Failed, step: 2 },
];

const OrderUpdateProcess = () => {
  const { order } = useOrderStore();

  const renderProcess = () => {
    if (order?.orderStatus === OrderOrderStatusEnum.Canceled) {
      return ProcessShippingCancel;
    }
    if (order?.orderStatus === OrderOrderStatusEnum.Failed) {
      return ProcessShippingFailed;
    }
    return ProcessShipping;
  };

  return (
    order && (
      <>
        <h3 className="mb-2 font-semibold">Đơn hàng</h3>
        <Stepper
          style={quickSandFont.style}
          activeStep={ProcessShipping.find((process) => process.label === order.orderStatus)?.step}
        >
          {renderProcess().map((process) => {
            return (
              <Step
                className={quickSandFont.className}
                label={convertOrderStatus[process.label]}
                key={process.label}
              />
            );
          })}
        </Stepper>
      </>
    )
  );
};

export default OrderUpdateProcess;
