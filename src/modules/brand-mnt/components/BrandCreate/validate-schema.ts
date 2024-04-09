import * as yup from 'yup';
import { FIELD_REQUIRED } from '@/constants/utils';

export const createBrandValidateSchema: yup.ObjectSchema<any> = yup.object({
  slug: yup.string().notRequired(),
  name: yup.string().required(FIELD_REQUIRED),
  description: yup.string().required(FIELD_REQUIRED),
});
