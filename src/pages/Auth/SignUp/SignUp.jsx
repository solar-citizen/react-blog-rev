import styles from './SignUp.module.css';
import { useState, useContext } from 'react';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import is from 'is_js';
import SelectAvatar from '../../../components/SelectAvatar/SelectAvatar';
import { Link } from 'react-router-dom';
import { RollbackOutlined } from '@ant-design/icons';
import UserContext from '../../../context/user/userContext';

const SignUp = () => {
  const { auth } = useContext(UserContext);

  const [isFormValid, setIsFormValid] = useState(false);
  const [profileImage, setProfileImage] = useState('');
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
    firstname: {
      value: '',
      type: 'text',
      label: 'First name',
      errorMessage: 'This field cannot be empty.',
      valid: false,
      touched: false,
      validation: {
        required: true,
      },
    },
    lastname: {
      value: '',
      type: 'text',
      label: 'Last name',
      errorMessage: 'This field cannot be empty.',
      valid: false,
      touched: false,
      validation: {
        required: true,
      },
    },
    age: {
      value: '',
      type: 'number',
      label: 'Age',
      errorMessage: 'Enter correct age.',
      valid: false,
      touched: false,
      validation: {
        required: true,
      },
      min: 1,
      max: 150,
    },
  });

  const submitHandler = (event) => {
    event.preventDefault();

    const isLogin = false;

    auth(
      isLogin,
      formControls.email.value,
      formControls.password.value,
      formControls.firstname.value,
      formControls.lastname.value,
      +formControls.age.value,
      profileImage
    );
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

    // invalid if values are less than 1
    if (validation?.min) {
      isValid = value >= 1 && isValid;
    }

    // invalid if values are more than 150
    if (validation?.max) {
      isValid = value <= 150 && isValid;
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

    let isFormValid = true;

    Object.keys(clonedFormControls).forEach((nameOfControl) => {
      isFormValid = formControls[nameOfControl].valid && isFormValid;
    });

    setFormControls(clonedFormControls);
    setIsFormValid(isFormValid);
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
          min={control.min}
          max={control.max}
        />
      );
    });
  };

  const imageChangeHandler = (profileImg) => {
    setProfileImage(profileImg);
  };

  return (
    <div className={styles.SignUp}>
      <Link to='/'>{<RollbackOutlined />} &nbsp;back to main</Link>
      <div>
        <h2>Register a new account</h2>

        <form
          onSubmit={(event) => submitHandler(event)}
          className={styles.SignUpForm}
        >
          {renderInputs()}

          {
            <SelectAvatar
              imageChangeHandler={imageChangeHandler}
              profileImage={profileImage}
              setProfileImage={setProfileImage}
            />
          }

          <Button type='submit' disabled={!isFormValid}>
            Sign up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
