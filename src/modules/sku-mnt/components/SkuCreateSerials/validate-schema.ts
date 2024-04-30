import { FIELD_REQUIRED } from '@/constants/utils';
import * as yup from 'yup';

export const createSerialValidateSchema: yup.ObjectSchema<any> = yup.object({
  serialNumbers: yup.array(
    yup.object({
      serial: yup
        .string()
        .min(12, 'Ít nhất 12 ký tự')
        .max(24, 'Nhiều nhất 24 ký tự')
        .required(FIELD_REQUIRED)
        .test('unique-serials', 'Số serial không được trùng lặp', function (value) {
          if (!value) return true;
          const serials = new Set();
          for (const item of value) {
            if (serials.has(item)) {
              return false;
            }
            serials.add(item);
          }
          return true;
        }),
    }),
  ),
});
