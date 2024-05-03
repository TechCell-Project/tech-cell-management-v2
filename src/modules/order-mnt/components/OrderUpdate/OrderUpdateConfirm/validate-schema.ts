import { FIELD_REQUIRED } from '@/constants/utils';
import * as yup from 'yup';

export const updateOrderStatusSchema: yup.ObjectSchema<any> = yup.object({
  orderStatus: yup.string().required(FIELD_REQUIRED),
  note: yup.string().required(FIELD_REQUIRED),
});

export const updateOrderStatusWithSerialNumberSchema: yup.ObjectSchema<any> = yup.object({
  orderStatus: yup.string().required(FIELD_REQUIRED),
  note: yup.string().required(FIELD_REQUIRED),
  updateSerialNumbers: yup.array(
    yup.object({
      serialNumbers: yup.array().of(yup.string()).min(1, FIELD_REQUIRED),
    }),
  ),
});
