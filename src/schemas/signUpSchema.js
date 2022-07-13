import * as yup from 'yup';
import {
  requiredMessage,
  emailMessage,
  minLength,
  maxLength,
  minValue,
  maxValue,
} from './rules';

export const signUpSchema = yup.object().shape({
  email: yup.string().email(emailMessage).required(requiredMessage),
  password: yup
    .string()
    .min(minLength().min, minLength().message)
    .max(maxLength().max, maxLength().message)
    .required(requiredMessage),
  firstName: yup.string().required(requiredMessage),
  lastName: yup.string().required(requiredMessage),
  age: yup
    .number()
    .positive()
    .integer()
    .min(minValue().min, minValue().message)
    .max(maxValue().max, maxValue().message)
    .required(requiredMessage),
});
