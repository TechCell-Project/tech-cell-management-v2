import * as yup from 'yup';
import { FIELD_REQUIRED } from '@/constants/utils';
import { AuthForgotPw } from '../../models/auth-forgot-pw';

export const forgotPwValidateSchema: yup.ObjectSchema<AuthForgotPw> = yup.object({
  email: yup.string().email('Email không hợp lệ').required(FIELD_REQUIRED),
  returnUrl: yup.string().required(FIELD_REQUIRED),
});
