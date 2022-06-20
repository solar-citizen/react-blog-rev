import styles from './UserProfile.module.css';
import { useContext, useState, useEffect } from 'react';
import UserContext from '../../../context/user/userContext';
import { Avatar } from '../../index';
import { SelectAvatar } from '../../index';
import { Button } from '../../index';
import { EditOutlined } from '@ant-design/icons';
import { Input } from '../../index';
import is from 'is_js';

const UserProfile = () => {
  const [profileImage, setProfileImage] = useState(<Avatar />);
  // const [activeContent, setActiveContent] = useState('');
  const [profileEditVisible, setProfileEditVisible] = useState(false);

  const { user, getUser, setNewUserData } = useContext(UserContext);
  const { id, email, firstname, lastname, age, avatar } = user;

  const [formControls, setFormControls] = useState({
    email: {
      value: email,
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
      value: firstname,
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
      value: lastname,
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
      value: age,
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
  });

  // temporary solution?
  useEffect(() => {
    getUser(user?.id);
    // setActiveContent(profileContent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

    setNewUserData(
      formControls.email.value,
      formControls.firstname.value,
      formControls.lastname.value,
      +formControls.age.value,
      id
    );
  };

  const cancelEditHandler = () => {
    setProfileEditVisible(false);
    // setActiveContent(profileContent);
  };

  // buttons
  const editProfileButton = (
    <Button type='primary' size='x-small' onClick={editProfileHandler}>
      <EditOutlined />
      Edit
    </Button>
  );

  const acceptProfileEditButton = (
    <Button type='primary-filled' onClick={acceptEditHandler}>
      Accept Changes
    </Button>
  );

  const cancelProfileEditButton = (
    <Button type='primary' onClick={cancelEditHandler}>
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
            currentAvatar={avatar}
            edit
          />
        }
        <span>
          {firstname} {lastname}
        </span>
      </div>
      <span>
        <b>Email:</b> {email}
      </span>
      <span>
        <b>Age:</b> {age}
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
