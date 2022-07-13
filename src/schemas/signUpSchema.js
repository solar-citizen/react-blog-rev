import * as yup from 'yup';
import {
  requiredMessage,
  emailMessage,
  minLength,
  maxLength,
  minValue,
  maxValue,
  numberTypeErrorMessage,
  numberIntegerMessage,
} from './rules';

const minLen = minLength();
const maxLen = maxLength();

const minVal = minValue();
const maxVal = maxValue();

export const signUpSchema = yup.object().shape({
  email: yup.string().email(emailMessage).required(requiredMessage),
  password: yup
    .string()
    .min(minLen.value, minLen.message)
    .max(maxLen.value, maxLen.message)
    .required(requiredMessage),
  firstName: yup.string().required(requiredMessage),
  lastName: yup.string().required(requiredMessage),
  age: yup
    .number()
    .typeError(numberTypeErrorMessage)
    .integer(numberIntegerMessage)
    .min(minVal.value, minVal.message)
    .max(maxVal.value, maxVal.message)
    .required(requiredMessage),
});
