import * as yup from 'yup';
import { AuthLogin } from '../../models';

export const loginValidateSchema: yup.ObjectSchema<AuthLogin> = yup.object({
  emailOrUsername: yup.string().required('Vui lòng nhập thông tin!'),
  password: yup.string().required('Vui lòng nhập thông tin!'),
});
