import * as yup from 'yup';
import { FIELD_REQUIRED } from '@/constants/utils';
import { AuthUpdatePw } from '~auth/models';

export const changePwValidateSchema: yup.ObjectSchema<AuthUpdatePw> = yup.object({
  oldPassword: yup.string().required(FIELD_REQUIRED),
  password: yup
    .string()
    .required(FIELD_REQUIRED)
    .min(8, 'Mật khẩu có ít nhất 8 kí tự!')
    .max(24, 'Mật khẩu có nhiều nhất 24 kí tự'),
  re_password: yup
    .string()
    .required(FIELD_REQUIRED)
    .oneOf([yup.ref('password')], 'Mật khẩu không trùng khớp!'),
});
