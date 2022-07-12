import styles from './SignIn.module.css';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/index';
import { RollbackOutlined } from '@ant-design/icons';
import UserContext from '../../../context/user/userContext';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const minLength = 8;
const maxLength = 24;
const schema = yup.object().shape({
  email: yup
    .string()
    .email('Email must be a valid email.')
    .required('Email is a required field.'),
  password: yup
    .string()
    .min(minLength, `Password must be at least ${minLength} characters.`)
    .max(maxLength, `Password must be at most ${maxLength} characters.`)
    .required('Password is a required field.'),
});

const SignIn = () => {
  const { auth } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const submitHandler = (data) => {
    const { email, password } = data;
    auth(true, email, password);
  };

  const renderForm = () => (
    <form
      onSubmit={handleSubmit((data) => submitHandler(data))}
      className={styles.SignInForm}
      noValidate
    >
      <label htmlFor='email' className='label'>
        Email
      </label>
      <input id='email' {...register('email')} />
      <span className='error-msg' role='alert'>
        {errors?.email?.message}
      </span>

      <label htmlFor='password' className='label'>
        Password
      </label>
      <input id='password' {...register('password')} />
      <span className='error-msg' role='alert'>
        {errors?.password?.message}
      </span>

      <Button type='submit' category='submit'>
        Sign in
      </Button>

      <Link to='/sign-up'>No account yet? Register then!</Link>
    </form>
  );

  return (
    <div className={styles.SignIn}>
      <Link to='/'>
        {<RollbackOutlined />}
        {` back to Blog`}
      </Link>
      <div>
        <h2>Log In</h2>

        {renderForm()}
      </div>
    </div>
  );
};

export default SignIn;
