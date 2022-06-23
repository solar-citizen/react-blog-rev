import styles from './SignIn.module.css';
import is from 'is_js';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input } from '../../../components/index';
import { RollbackOutlined } from '@ant-design/icons';
import UserContext from '../../../context/user/userContext';

const SignIn = () => {
  const { auth } = useContext(UserContext);

  const [formControls, setFormControls] = useState({
    email: {
      value: '',
      type: 'email',
      label: 'Email',
      errorMessage: 'Enter correct email.',
      valid: false,
      touched: false,
      validation: {
        required: true,
        email: true,
      },
    },
    password: {
      value: '',
      type: 'password',
      label: 'Password',
      errorMessage: 'Enter correct password.',
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 8,
      },
    },
  });

  const submitHandler = (event) => {
    event.preventDefault();
    auth(true, formControls.email.value, formControls.password.value);
  };

  // validation of input field
  const validateControl = (value, validation) => {
    if (!validation) {
      return true;
    }

    let isValid = true;

    // invalid if empty
    if (validation?.required) {
      isValid = value.trim() !== '' && isValid;
    }

    // invalid if not email
    if (validation?.email) {
      isValid = is.email(value) && isValid;
    }

    // invalid shorter than minimal length (8)
    if (validation?.minLength) {
      isValid = value.length >= validation?.minLength && isValid;
    }

    return isValid;
  };

  // fixation of changes of input field
  const onChangeHandler = (event, controlName) => {
    const clonedFormControls = { ...formControls };
    const control = { ...clonedFormControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = validateControl(control.value, control.validation);

    clonedFormControls[controlName] = control;

    setFormControls(clonedFormControls);
  };

  const renderInputs = () => {
    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName];

      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          errorMessage={control.errorMessage}
          shouldValidate={!!control.validation}
          onChange={(event) => onChangeHandler(event, controlName)}
        />
      );
    });
  };

  return (
    <div className={styles.SignIn}>
      <Link to='/'>
        {<RollbackOutlined />}
        {` back to main`}
      </Link>
      <div>
        <h2>Log In</h2>

        <form
          onSubmit={(event) => submitHandler(event)}
          className={styles.SignInForm}
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
