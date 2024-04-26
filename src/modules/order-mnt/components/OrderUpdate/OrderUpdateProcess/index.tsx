import { quickSandFont } from '@/components/config';
import { ProcessShipping, ProcessShippingCancel, ProcessShippingFailed } from '@/constants/utils';
import { useOrderStore } from '@/modules/order-mnt/store';
import { convertOrderStatus } from '@/utilities/convert.util';
import { OrderOrderStatusEnum } from '@techcell/node-sdk';
import { Stepper, Step } from 'react-form-stepper';

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
          activeStep={ProcessShipping.find((process) => process.label === order.orderStatus)?.step as number - 1}
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
