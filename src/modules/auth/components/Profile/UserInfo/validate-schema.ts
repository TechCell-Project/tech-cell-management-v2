import * as yup from 'yup';
import { FIELD_REQUIRED } from '@/constants/utils';
import { AuthUpdateInfo } from '~auth/models';

export const updateInfoValidateSchema: yup.ObjectSchema<AuthUpdateInfo> = yup.object({
  firstName: yup.string().required(FIELD_REQUIRED),
  lastName: yup.string().required(FIELD_REQUIRED),
  userName: yup.string().required(FIELD_REQUIRED),
});
