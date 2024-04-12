import * as yup from 'yup';
import { FIELD_REQUIRED } from '@/constants/utils';

export const createAttrValidateSchema: yup.ObjectSchema<any> = yup.object({
  name: yup.string().required(FIELD_REQUIRED),
});
