import styles from './SignIn.module.css';
import is from 'is_js';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/index';
import { RollbackOutlined } from '@ant-design/icons';
import UserContext from '../../../context/user/userContext';

const SignIn = () => {
  const { auth } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const submitHandler = (data) => {
    const { email, password } = data;
    auth(true, email, password);
  };

  const renderInputs = () => (
    <>
      <label htmlFor='email' className='label'>
        Email
      </label>
      <input
        id='email'
        {...register('email', {
          required: 'This field is required.',
          validate: {
            isEmail: (value) => is.email(value) || 'Enter correct email.',
          },
        })}
      />
      <span className='error-msg' role='alert'>
        {errors?.email?.message}
      </span>

      <label htmlFor='password' className='label'>
        Password
      </label>
      <input
        id='password'
        {...register('password', {
          required: 'This field is required.',
          minLength: {
            value: 8,
            message: 'Minimum password length is 8 symbols.',
          },
        })}
      />
      <span className='error-msg' role='alert'>
        {errors?.password?.message}
      </span>
    </>
  );

  return (
    <div className={styles.SignIn}>
      <Link to='/'>
        {<RollbackOutlined />}
        {` back to main`}
      </Link>
      <div>
        <h2>Log In</h2>

        <form
          onSubmit={handleSubmit((data) => submitHandler(data))}
          className={styles.SignInForm}
          noValidate
        >
          {renderInputs()}

          <Button type='submit'>Sign in</Button>

          <Link to='/sign-up'>No account yet? Register then!</Link>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
