import styles from './CreatePost.module.css';
import dayjs from 'dayjs';
import { Button } from '../../components/index';
import { Input } from '../../components/index';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PostsContext from '../../context/posts/postsContext';
import UserContext from '../../context/user/userContext';

const CreatePost = () => {
  const { user } = useContext(UserContext);
  const { createPost } = useContext(PostsContext);

  const [isFormValid, setIsFormValid] = useState(false);
  const [formControls, setFormControls] = useState({
    title: {
      value: '',
      type: 'text',
      label: 'Title',
      errorMessage: 'This field cannot be empty.',
      valid: false,
      touched: false,
      validation: {
        required: true,
      },
    },
    body: {
      value: '',
      type: 'textarea',
      label: 'Text',
      errorMessage: 'This field cannot be empty.',
      valid: false,
      touched: false,
      validation: {
        required: true,
      },
    },
  });

  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
  };

  // send new post to db
  const createPostHandler = () => {
    createPost(
      formControls.title.value,
      formControls.body.value,
      user.id,
      dayjs()
    );

    // reset form controls
    setFormControls(
      { ...formControls },
      (formControls.title.value = ''),
      (formControls.body.value = '')
    );

    // may be delay should be deleted with real server
    setTimeout(() => {
      navigate('/');
    }, 300);
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
        />
      );
    });
  };

  return (
    <div className={styles.CreatePost}>
      <form onSubmit={submitHandler}>
        <h1>Create new post</h1>

        {renderInputs()}

        <Button
          type='create'
          onClick={createPostHandler}
          disabled={!isFormValid}
        >
          Create
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
