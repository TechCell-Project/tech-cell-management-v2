import { OrderOrderStatusEnum } from '@techcell/node-sdk';

// Yup validate for required()
export const FIELD_REQUIRED = 'Vui lòng không để trống!';

// Dayjs type format date
export const FORMAT_DATE = 'DD/MM/YYYY h:mm A';

export const ProcessShipping = [
  { label: OrderOrderStatusEnum.Pending, step: 1 },
  { label: OrderOrderStatusEnum.Confirmed, step: 2 },
  { label: OrderOrderStatusEnum.Preparing, step: 3 },
  { label: OrderOrderStatusEnum.Prepared, step: 4 },
  { label: OrderOrderStatusEnum.Shipping, step: 5 },
  { label: OrderOrderStatusEnum.Completed, step: 6 },
];

export const ProcessShippingCancel = [
  { label: OrderOrderStatusEnum.Pending, step: 1 },
  { label: OrderOrderStatusEnum.Canceled, step: 2 },
];

export const ProcessShippingFailed = [
  { label: OrderOrderStatusEnum.Pending, step: 1 },
  { label: OrderOrderStatusEnum.Failed, step: 2 },
];
