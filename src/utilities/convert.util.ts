import {
  BlockUserDtoActionEnum,
  OrderOrderStatusEnum,
  PaymentSchemaStatusEnum,
  UserRoleEnum,
} from '@techcell/node-sdk';

type FieldsString = { [key: string]: string };

export const convertRoleViVN: FieldsString = {
  [UserRoleEnum.Customer]: 'Khách hàng',
  [UserRoleEnum.Manager]: 'Quản lý',
  [UserRoleEnum.Sales]: 'Nhân viên bán hàng',
  [UserRoleEnum.Warehouse]: 'Nhân viên kho',
};

export const convertBlockAction: FieldsString = {
  [BlockUserDtoActionEnum.Block]: 'Chặn',
  [BlockUserDtoActionEnum.Unblock]: 'Bỏ chặn',
};

export const convertOrderPaymentStatus: FieldsString = {
  [PaymentSchemaStatusEnum.Pending]: 'Chưa thanh toán',
  [PaymentSchemaStatusEnum.WaitForPayment]: 'Chưa thanh toán',
  [PaymentSchemaStatusEnum.Completed]: 'Đã thanh toán',
  [PaymentSchemaStatusEnum.Failed]: 'Đơn giao thất bại',
  [PaymentSchemaStatusEnum.Processing]: 'Giao hàng',
  [PaymentSchemaStatusEnum.Canceled]: 'Đơn hàng bị huỷ',
};

export const convertOrderStatus: FieldsString = {
  [OrderOrderStatusEnum.Pending]: 'Chưa xử lý',
  [OrderOrderStatusEnum.Confirmed]: 'Xác nhận đơn',
  [OrderOrderStatusEnum.Preparing]: 'Chuẩn bị hàng',
  [OrderOrderStatusEnum.Prepared]: 'Hoàn thành đóng hàng',
  [OrderOrderStatusEnum.Shipping]: 'Giao hàng',
  [OrderOrderStatusEnum.Completed]: 'Đơn giao thành công',
  [OrderOrderStatusEnum.Failed]: 'Đơn hàng bị hủy',
  [OrderOrderStatusEnum.Canceled]: 'Đơn bị huỷ',
};
