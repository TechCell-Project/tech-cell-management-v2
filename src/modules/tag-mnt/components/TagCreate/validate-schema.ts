import * as yup from 'yup';
import { FIELD_REQUIRED } from '@/constants/utils';

export const createTagValidateSchema: yup.ObjectSchema<any> = yup.object({
  name: yup.string().required(FIELD_REQUIRED),
  description: yup.string().required(FIELD_REQUIRED),
});
