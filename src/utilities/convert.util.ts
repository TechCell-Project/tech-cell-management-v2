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
  [UserRoleEnum.Accountant]: 'Kế toán',
  [UserRoleEnum.DataEntry]: 'Nhân viên nhập liệu',
  [UserRoleEnum.Sales]: 'Nhân viên bán hàng',
  [UserRoleEnum.Warehouse]: 'Nhân viên kho',
};

export const convertBlockAction: FieldsString = {
  [BlockUserDtoActionEnum.Block]: 'Chặn',
  [BlockUserDtoActionEnum.Unblock]: 'Bỏ chặn',
};

export const convertOrderPaymentStatus: FieldsString = {
  [PaymentSchemaStatusEnum.Pending]: 'Chưa xử lý',
  [PaymentSchemaStatusEnum.WaitForPayment]: 'Chưa thanh toán',
  [PaymentSchemaStatusEnum.Completed]: 'Đã giao thành công',
  [PaymentSchemaStatusEnum.Failed]: 'Đơn giao thất bại',
  [PaymentSchemaStatusEnum.Processing]: 'Đang trên đường giao',
  [PaymentSchemaStatusEnum.Canceled]: 'Đơn hàng bị huỷ',
};

export const convertOrderStatus: FieldsString = {
  [OrderOrderStatusEnum.Pending]: 'Chưa xử lý',
  [OrderOrderStatusEnum.Confirmed]: 'Xác nhận',
  [OrderOrderStatusEnum.Preparing]: 'Chuẩn bị hàng',
  [OrderOrderStatusEnum.Prepared]: 'Chờ giao đơn vị vận chuyển',
  [OrderOrderStatusEnum.Shipping]: 'Đang trên đường giao',
  [OrderOrderStatusEnum.Completed]: 'Đơn giao thành công',
  [OrderOrderStatusEnum.Failed]: 'Đơn giao thất bại',
  [OrderOrderStatusEnum.Canceled]: 'Đơn bị huỷ',
};
