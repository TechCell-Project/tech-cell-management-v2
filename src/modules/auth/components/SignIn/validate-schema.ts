import * as yup from 'yup';
import { AuthLogin } from '~auth/models';

export const loginValidateSchema: yup.ObjectSchema<AuthLogin> = yup.object({
  email: yup.string().required('Vui lòng nhập thông tin!'),
  password: yup.string().required('Vui lòng nhập thông tin!'),
});
