import * as yup from 'yup';
import { AuthVerifyForgotPassword } from '~auth/models';
import { FIELD_REQUIRED } from '@/constants/utils';

export const forgotPwValidateSchema: yup.ObjectSchema<AuthVerifyForgotPassword> = yup.object({
  email: yup.string().email('Email không hợp lệ').required(FIELD_REQUIRED),
  otpCode: yup.string().length(6, 'Mã OTP gồm 6 số!').required(FIELD_REQUIRED),
  password: yup
    .string()
    .min(8, 'Mật khẩu có ít nhất 8 kí tự!')
    .max(24, 'Mật khẩu có nhiều nhất 24 kí tự')
    .required(FIELD_REQUIRED),
  re_password: yup
    .string()
    .oneOf([yup.ref('password')], 'Mật khẩu không trùng khớp!')
    .required(FIELD_REQUIRED),
});
