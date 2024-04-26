import { FIELD_REQUIRED } from '@/constants/utils';
import * as yup from 'yup';

export const createSerialValidateSchema: yup.ObjectSchema<any> = yup.object({
  serialNumbers: yup.array(
    yup
      .string()
      .min(12, 'Ít nhất 12 ký tự')
      .max(24, 'Nhiều nhất 24 ký tự')
      .required(FIELD_REQUIRED),
  ),
});
