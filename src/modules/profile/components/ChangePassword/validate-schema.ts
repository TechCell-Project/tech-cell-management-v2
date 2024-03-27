import * as yup from 'yup';
import { FIELD_REQUIRED } from '@/constants/utils';
import { ProfileChangePassword } from '~profile/models';

export const changePwValidateSchema: yup.ObjectSchema<ProfileChangePassword> = yup.object({
  oldPassword: yup.string().required(FIELD_REQUIRED),
  newPassword: yup
    .string()
    .required(FIELD_REQUIRED)
    .min(8, 'Mật khẩu có ít nhất 8 kí tự!')
    .max(24, 'Mật khẩu có nhiều nhất 24 kí tự'),
  reNewPassword: yup
    .string()
    .required(FIELD_REQUIRED)
    .oneOf([yup.ref('newPassword')], 'Mật khẩu không trùng khớp!'),
});
