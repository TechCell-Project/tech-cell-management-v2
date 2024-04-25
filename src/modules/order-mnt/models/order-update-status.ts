import {
  UpdateOrderStatusDto,
  UpdateOrderStatusDtoOrderStatusEnum,
  UpdateSerialNumberDto,
} from '@techcell/node-sdk';

export class OrderUpdateStatus implements UpdateOrderStatusDto {
  orderStatus = UpdateOrderStatusDtoOrderStatusEnum.Pending;
  note = '';
  updateSerialNumbers?: UpdateSerialNumberDto[];
}
