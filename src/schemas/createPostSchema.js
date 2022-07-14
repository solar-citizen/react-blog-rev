import * as yup from 'yup';
import { requiredMessage } from './rules';

export const createPostSchema = yup.object().shape({
  title: yup.string().required(requiredMessage),
  body: yup.string().required(requiredMessage),
});
