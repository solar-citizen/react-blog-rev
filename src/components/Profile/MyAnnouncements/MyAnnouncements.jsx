import styles from './MyAnnouncements.module.css';
import { useContext, useState } from 'react';
import Loader from '../../UI/Loader/Loader';
import Announcement from '../../Announcement/Announcement';
import Input from '../../UI/Input/Input';
import { Button } from 'antd';
import UserContext from '../../../context/user/userContext';
import AnnouncementsContext from '../../../context/announcements/announcementsContext';
import LoadingContext from '../../../context/loading/loadingContext';

const MyAnnouncements = () => {
  const { user } = useContext(UserContext);
  const { announcements, addAnnouncement } = useContext(AnnouncementsContext);
  const { loading } = useContext(LoadingContext);

  const [isFormValid, setIsFormValid] = useState(false);
  const [formControls, setFormControls] = useState({
    title: {
      value: '',
      type: 'text',
      label: 'Announcement title',
      errorMessage: 'This field cannot be empty.',
      valid: false,
      touched: false,
      validation: {
        required: true,
      },
    },
    body: {
      value: '',
      type: 'text',
      label: 'Announcement text',
      errorMessage: 'This field cannot be empty.',
      valid: false,
      touched: false,
      validation: {
        required: true,
      },
    },
  });

  // validation of input field
  const validateControl = (value, validation) => {
    if (!validation) {
      return true;
    }

    let isValid = true;

    // invalid if empty
    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
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
          label={control.label}
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          errorMessage={control.errorMessage}
          shouldValidate={!!control.validation}
          onChange={(event) => onChangeHandler(event, controlName)}
        />
      );
    });
  };

  // conditional render of announcements
  // made by logged user
  const renderUserAnnouncements = () => {
    const userAnnouncements =
      announcements.length &&
      announcements.filter(
        (announcementItem) => announcementItem.userId === user.id
      );

    if (loading) {
      return <Loader />;
    }

    if (!userAnnouncements || !userAnnouncements.length) {
      return <div>No announcements here yet...</div>;
    }

    // userAnnouncements && userAnnouncements.length (???)
    if (userAnnouncements) {
      return userAnnouncements.map((userAnnouncementItem) => (
        <Announcement
          isNotification={false}
          announcement={userAnnouncementItem}
          key={userAnnouncementItem.id}
        />
      ));
    }
  };

  // send created announcement to db
  const createHandler = () => {
    const timestamp = new Date();

    // title, body, userId, createdAt
    addAnnouncement(
      formControls.title.value,
      formControls.body.value,
      user.id,
      timestamp
    );

    setFormControls(
      { ...formControls },
      (formControls.body.value = ''),
      (formControls.title.value = '')
    );
  };

  const createButton = (
    <Button
      size='small'
      type='primary'
      onClick={createHandler}
      disabled={!isFormValid}
    >
      Accept
    </Button>
  );

  return (
    <div className={styles.MyAnnouncements}>
      <h2>My announcements</h2>

      <div>
        <h3>Create an announcement</h3>
        {renderInputs()}
        {createButton}
      </div>

      <div>
        <h3>Announcements:</h3>
        {renderUserAnnouncements()}
      </div>
    </div>
  );
};

export default MyAnnouncements;