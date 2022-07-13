import * as yup from 'yup';
import { requiredMessage, emailMessage, minLength, maxLength } from './rules';

const minLen = minLength();
const maxLen = maxLength();

export const signInSchema = yup.object().shape({
  email: yup.string().email(emailMessage).required(requiredMessage),
  password: yup
    .string()
    .min(minLen.value, minLen.message)
    .max(maxLen.value, maxLen.message)
    .required(requiredMessage),
});
