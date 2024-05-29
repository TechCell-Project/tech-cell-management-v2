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
          activeStep={
            (ProcessShipping.find((process) => process.label === order.orderStatus)
              ?.step as number) - 1
          }
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

        <ol className="relative border-s border-gray-200 dark:border-gray-700">
          {order.orderLogs.map((log) => (
            <li className="ms-4" key={log.action}>
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                February 2022
              </time>
              <h3 className="text-base mb-2 font-semibold text-gray-900 dark:text-white">
                Note: {log.note}
              </h3>
            </li>
          ))}
        </ol>
      </>
    )
  );
};

export default OrderUpdateProcess;
