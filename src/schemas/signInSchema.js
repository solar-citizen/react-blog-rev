import * as yup from 'yup';
import { requiredMessage, emailMessage, minLength, maxLength } from './rules';

const minLn = minLength();
const maxLn = maxLength();

export const signInSchema = yup.object().shape({
  email: yup.string().email(emailMessage).required(requiredMessage),
  password: yup
    .string()
    .min(minLn.value, minLn.message)
    .max(maxLn.value, maxLn.message)
    .required(requiredMessage),
});
