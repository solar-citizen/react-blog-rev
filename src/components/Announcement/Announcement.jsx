import styles from './Announcement.module.css';
import dayjs from 'dayjs';
import { useState, useContext } from 'react';
import { Button } from '../index';
import { Input } from '../index';
import { CloseSquareOutlined } from '@ant-design/icons';
import UserContext from '../../context/user/userContext';
import AnnouncementsContext from '../../context/announcements/announcementsContext';

const Announcement = ({ announcement, isNotification }) => {
  const { user } = useContext(UserContext);
  const {
    deleteAnnouncement,
    editAnnouncement,
    setAnnouncements,
    announcements,
  } = useContext(AnnouncementsContext);

  const [isEditInputVisible, setIsEditInputVisible] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const [formControls, setFormControls] = useState({
    body: {
      value: announcement.body,
      type: 'text',
      label: '',
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
    if (validation?.required) {
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

  const closeHandler = () => {
    setAnnouncements(
      announcements.filter(
        (announcementItem) => announcementItem?.id !== announcement?.id
      )
    );
  };

  const editHandler = () => {
    setIsEditInputVisible(true);
  };

  // send edited comment to db
  const acceptEditHandler = () => {
    setIsEditInputVisible(false);
    editAnnouncement(formControls?.body?.value, dayjs(), announcement?.id);
  };

  const cancelEditHandler = () => {
    setIsEditInputVisible(false);
  };

  const deleteHandler = () => {
    deleteAnnouncement(announcement?.id);

    setAnnouncements(
      announcements.filter(
        (announcementItem) => announcementItem?.id !== announcement?.id
      )
    );
  };

  // buttons
  const editButton = (
    <Button type='primary' size='small' onClick={editHandler}>
      Edit
    </Button>
  );
  const acceptButton = (
    <Button
      type='primary'
      size='small'
      onClick={acceptEditHandler}
      disabled={!isFormValid}
    >
      Accept
    </Button>
  );
  const cancelButton = (
    <Button type='primary' size='small' onClick={cancelEditHandler}>
      Cancel
    </Button>
  );
  const deleteCommentButton = (
    <Button type='danger' size='small' onClick={deleteHandler}>
      Delete
    </Button>
  );

  return (
    //                                                                 : null
    <div className={isNotification ? `${styles.Announcement} bg-white` : ''}>
      {isNotification && <CloseSquareOutlined onClick={closeHandler} />}

      <h3>{announcement?.title}</h3>
      <span>{!isEditInputVisible ? announcement?.body : renderInputs()}</span>

      {!isNotification && (
        <div>
          {user?.id === announcement?.userId && isEditInputVisible
            ? acceptButton
            : editButton}
          {user?.id === announcement?.userId && isEditInputVisible
            ? cancelButton
            : deleteCommentButton}
        </div>
      )}
    </div>
  );
};

export default Announcement;
