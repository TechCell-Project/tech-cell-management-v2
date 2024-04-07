import * as yup from 'yup';
import { FIELD_REQUIRED } from '@/constants/utils';

export const blockOrUnbValidateSchema = yup.object({
  block: yup.object().shape({
    action: yup.string().required(FIELD_REQUIRED),
    activityLogs: yup.object().shape({
      reason: yup.string().required(FIELD_REQUIRED),
    }),
  }),
});
