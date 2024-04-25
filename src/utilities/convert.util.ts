import {
  BlockUserDtoActionEnum,
  PaymentSchemaStatusEnum,
  UserAddressSchemaTypeEnum,
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

export const convertTypeAddress: FieldsString = {
  [UserAddressSchemaTypeEnum.Home]: 'Nhà',
  [UserAddressSchemaTypeEnum.Office]: 'Văn phòng/Công ty',
  [UserAddressSchemaTypeEnum.Other]: 'Khác',
};

export const convertBlockAction: FieldsString = {
  [BlockUserDtoActionEnum.Block]: 'Chặn',
  [BlockUserDtoActionEnum.Unblock]: 'Bỏ chặn',
};

export const convertOrderPaymentStatus: FieldsString = {
  [PaymentSchemaStatusEnum.Pending]: 'Đang chờ xử lý',
  [PaymentSchemaStatusEnum.WaitForPayment]: 'Chưa thanh toán',
  [PaymentSchemaStatusEnum.Completed]: 'Đã giao thành công',
  [PaymentSchemaStatusEnum.Failed]: 'Đơn giao thất bại',
  [PaymentSchemaStatusEnum.Processing]: 'Đang trên đường giao',
  [PaymentSchemaStatusEnum.Canceled]: 'Đơn hàng bị huỷ',
};
