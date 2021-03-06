import styles from './UserProfile.module.css';
import { useContext, useState, useEffect } from 'react';
import UserContext from '../../../context/user/userContext';
import { Button, Input, Avatar, SelectAvatar } from '../../index';
import { EditOutlined } from '@ant-design/icons';
import is from 'is_js';

const UserProfile = () => {
  const { user, editUser } = useContext(UserContext);

  // const [activeContent, setActiveContent] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [profileImage, setProfileImage] = useState(<Avatar />);
  const [profileEditVisible, setProfileEditVisible] = useState(false);
  const [formControls, setFormControls] = useState({
    email: {
      value: user?.email,
      type: 'email',
      label: 'Change email',
      errorMessage: 'Enter correct email.',
      valid: false,
      touched: false,
      validation: {
        required: true,
        email: true,
      },
    },
    firstname: {
      value: user?.firstname,
      type: 'text',
      label: 'Change first name',
      errorMessage: 'This field cannot be empty.',
      valid: false,
      touched: false,
      validation: {
        required: true,
      },
    },
    lastname: {
      value: user?.lastname,
      type: 'text',
      label: 'Change last name',
      errorMessage: 'This field cannot be empty.',
      valid: false,
      touched: false,
      validation: {
        required: true,
      },
    },
    age: {
      value: user?.age,
      type: 'number',
      label: 'Change age',
      errorMessage: 'Enter correct age.',
      valid: false,
      touched: false,
      validation: {
        required: true,
      },
      min: 1,
      max: 150,
    },
    password: {
      value: '',
      type: 'password',
      label: 'Change password',
      errorMessage: 'Enter correct password.',
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 8,
      },
    },
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

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

    // invalid if valuse less than 1
    if (validation?.min) {
      isValid = value >= 1 && isValid;
    }

    // invalid if valuse more than 150
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

  const editProfileHandler = () => {
    // setActiveContent(editProfileContent);
    setProfileEditVisible(true);
  };

  const acceptEditHandler = () => {
    setProfileEditVisible(false);
    // setActiveContent(profileContent);

    editUser(
      formControls.email.value,
      formControls.firstname.value,
      formControls.lastname.value,
      +formControls.age.value,
      formControls.password.value,
      user?.id
    );
  };

  const cancelEditHandler = () => {
    setProfileEditVisible(false);
    // setActiveContent(profileContent);
  };

  // buttons
  const editProfileButton = (
    <Button
      type='button'
      category='primary'
      size='x-small'
      onClick={editProfileHandler}
    >
      <EditOutlined />
      Edit
    </Button>
  );

  const acceptProfileEditButton = (
    <Button
      type='button'
      category='primary-filled'
      onClick={acceptEditHandler}
      disabled={!isFormValid}
    >
      Accept Changes
    </Button>
  );

  const cancelProfileEditButton = (
    <Button type='button' category='primary' onClick={cancelEditHandler}>
      Cancel
    </Button>
  );

  const profileContent = (
    <>
      <h2>My profile</h2>
      {editProfileButton}

      <div className={styles.profileContent}>
        {
          <SelectAvatar
            imageChangeHandler={imageChangeHandler}
            profileImage={profileImage}
            setProfileImage={setProfileImage}
            currentAvatar={user?.avatar}
            edit
          />
        }
        <span>
          {user?.firstname} {user?.lastname}
        </span>
      </div>
      <span>
        <b>Email:</b> {user?.email}
      </span>
      <span>
        <b>Age:</b> {user?.age}
      </span>
    </>
  );

  const editProfileContent = (
    <>
      <h2>Edit profile</h2>

      {renderInputs()}

      {cancelProfileEditButton}
      {acceptProfileEditButton}
    </>
  );

  return (
    <div className={styles.UserProfile}>
      {profileEditVisible ? editProfileContent : profileContent}
      {/* {activeContent} */}
    </div>
  );
};

export default UserProfile;
