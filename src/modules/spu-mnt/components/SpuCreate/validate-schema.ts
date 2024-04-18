import { FIELD_REQUIRED } from '@/constants/utils';
import * as yup from 'yup';

export const createSpuValidateSchema: yup.ObjectSchema<any> = yup.object({
  name: yup.string().required(FIELD_REQUIRED),
  brandId: yup.string().required(FIELD_REQUIRED),
});
