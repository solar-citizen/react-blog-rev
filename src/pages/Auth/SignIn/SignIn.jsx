import styles from './SignIn.module.css';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/index';
import { RollbackOutlined } from '@ant-design/icons';
import UserContext from '../../../context/user/userContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInSchema } from '../../../schemas/index';

const SignIn = () => {
  const { auth } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
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
        <h2>Log in</h2>
        {renderForm()}
      </div>
    </div>
  );
};

export default SignIn;
