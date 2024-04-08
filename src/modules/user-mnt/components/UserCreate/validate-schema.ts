import * as yup from 'yup';
import { UserCreateNew } from '../../models';
import { FIELD_REQUIRED } from '@/constants/utils';

export const createUserValidateSchema: yup.ObjectSchema<UserCreateNew> = yup.object({
  role: yup.string().required(FIELD_REQUIRED),
  firstName: yup.string().required(FIELD_REQUIRED),
  lastName: yup.string().required(FIELD_REQUIRED),
  email: yup.string().email('Email không hợp lệ').required(FIELD_REQUIRED),
  password: yup
    .string()
    .min(8, 'Mật khẩu có ít nhất 8 kí tự!')
    .max(24, 'Mật khẩu có nhiều nhất 24 kí tự')
    .required(FIELD_REQUIRED),
});
