import * as yup from 'yup';
import { AuthResetPassword } from '../../models';
import { FIELD_REQUIRED } from '@/constants/utils';

export const resetPwValidateSchema: yup.ObjectSchema<AuthResetPassword> = yup.object({
  password: yup.string().required(FIELD_REQUIRED),
  hash: yup.string().required(FIELD_REQUIRED),
});
