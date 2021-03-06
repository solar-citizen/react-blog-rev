import styles from './SignUp.module.css';
import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button, SelectAvatar } from '../../../components/index';
import { RollbackOutlined } from '@ant-design/icons';
import UserContext from '../../../context/user/userContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpSchema } from '../../../schemas/index';

const SignUp = () => {
  const [profileImage, setProfileImage] = useState('');
  const { auth } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(signUpSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      age: null,
    },
  });

  const submitHandler = (data) => {
    const { email, password, firstName, lastName, age } = data;
    auth(false, email, password, firstName, lastName, age, profileImage);
  };

  // const renderForm = () => (
  //   <form
  //     onSubmit={handleSubmit((data) => submitHandler(data))}
  //     className={styles.SignUpForm}
  //     noValidate
  //   >
  //     <label htmlFor='email' className='label'>
  //       Email
  //     </label>
  //     <input
  //       id='email'
  //       {...register('email', {
  //         required: 'This field is required.',
  //         validate: {
  //           isEmail: (value) => is.email(value) || 'Enter correct email.',
  //         },
  //       })}
  //     />
  //     <span className='error-msg' role='alert'>
  //       {errors?.email?.message}
  //     </span>

  //     <label htmlFor='password' className='label'>
  //       Password
  //     </label>
  //     <input
  //       id='password'
  //       {...register('password', {
  //         required: 'This field is required.',
  //         minLength: {
  //           value: 8,
  //           message: 'Minimum password length is 8 symbols.',
  //         },
  //       })}
  //     />
  //     <span className='error-msg' role='alert'>
  //       {errors?.password?.message}
  //     </span>

  //     <label htmlFor='firstName' className='label'>
  //       First Name
  //     </label>
  //     <input
  //       id='firstName'
  //       {...register('firstName', {
  //         required: 'This field is required.',
  //       })}
  //     />
  //     <span className='error-msg' role='alert'>
  //       {errors?.firstName?.message}
  //     </span>

  //     <label htmlFor='lastName' className='label'>
  //       Last Name
  //     </label>
  //     <input
  //       id='lastName'
  //       {...register('lastName', {
  //         required: 'This field is required.',
  //       })}
  //     />
  //     <span className='error-msg' role='alert'>
  //       {errors?.lastName?.message}
  //     </span>

  //     <label htmlFor='age' className='label'>
  //       Age
  //     </label>
  //     <input
  //       type='number'
  //       id='age'
  //       min={1}
  //       max={150}
  //       {...register('age', {
  //         valueAsNumber: true,
  //         required: 'This input is required.',
  //         min: {
  //           value: 1,
  //           message: 'Value cannot be lower than 1.',
  //         },
  //         max: {
  //           value: 150,
  //           message: 'Value cannot be higher than 150.',
  //         },
  //       })}
  //       onKeyDown={(e) =>
  //         ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()
  //       }
  //     />
  //     <span className='error-msg' role='alert'>
  //       {errors?.age?.message}
  //     </span>

  //     <SelectAvatar
  //       imageChangeHandler={imageChangeHandler}
  //       profileImage={profileImage}
  //       setProfileImage={setProfileImage}
  //     />

  //     <Button type='submit' category='submit' disabled={!isValid}>
  //       Sign up
  //     </Button>
  //   </form>
  // );
  const renderForm = () => (
    <form
      onSubmit={handleSubmit((data) => submitHandler(data))}
      className={styles.SignUpForm}
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

      <label htmlFor='firstName' className='label'>
        First Name
      </label>
      <input id='firstName' {...register('firstName')} />
      <span className='error-msg' role='alert'>
        {errors?.firstName?.message}
      </span>

      <label htmlFor='lastName' className='label'>
        Last Name
      </label>
      <input id='lastName' {...register('lastName')} />
      <span className='error-msg' role='alert'>
        {errors?.lastName?.message}
      </span>

      <label htmlFor='age' className='label'>
        Age
      </label>
      <input
        type='number'
        id='age'
        min={1}
        max={150}
        {...register('age')}
        onKeyDown={(e) =>
          ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()
        }
      />
      <span className='error-msg' role='alert'>
        {errors?.age?.message}
      </span>

      <SelectAvatar
        imageChangeHandler={imageChangeHandler}
        profileImage={profileImage}
        setProfileImage={setProfileImage}
      />

      <Button type='submit' category='submit' disabled={!isValid}>
        Sign up
      </Button>
    </form>
  );

  const imageChangeHandler = (profileImg) => {
    setProfileImage(profileImg);
  };

  return (
    <div className={styles.SignUp}>
      <Link to='/'>
        {<RollbackOutlined />}
        {` back to Blog`}
      </Link>
      <div>
        <h2>Register a new account</h2>
        {renderForm()}
      </div>
    </div>
  );
};

export default SignUp;
