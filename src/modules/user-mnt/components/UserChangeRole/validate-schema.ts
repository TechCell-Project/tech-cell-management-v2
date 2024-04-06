import * as yup from 'yup';
import { FIELD_REQUIRED } from '@/constants/utils';
import { UserUpdate } from '../../models';

export const changeRoleValidateSchema: yup.ObjectSchema<Pick<UserUpdate, 'role'>> = yup.object({
  role: yup.string().required(FIELD_REQUIRED),
});
