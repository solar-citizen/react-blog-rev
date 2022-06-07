import styles from './Comment.module.css';
import axios from 'axios';
import { baseURL } from '../../urls';
import { useContext, useState } from 'react';
import PostsContext from '../../context/posts/postsContext';
import convertDate from '../../helpers/convertDate';
import { Link } from 'react-router-dom';
import Input from '../UI/Input/Input';
import { Button } from 'antd';
import UserContext from '../../context/user/userContext';
import Avatar from '../Avatar/Avatar';

const Comment = ({ comments, setComments, getComments, comment, i }) => {
  const { user, token } = useContext(UserContext);
  const { post } = useContext(PostsContext);

  const [isEditInputVisible, setIsEditInputVisible] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const [formControls, setFormControls] = useState({
    body: {
      value: comment.body,
      type: 'textarea',
      errorMessage: 'This field cannot be empty.',
      valid: true,
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

  // console.log(formControls);

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

  const deleteComment = (commentID) => {
    axios({
      url: `${baseURL}/comments/${commentID}`,
      method: 'delete',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const editComment = async (body, updatedAt, commentId, postId) => {
    const response = await axios({
      url: `${baseURL}/comments/${commentId}`,
      method: 'patch',
      data: {
        body,
        updatedAt,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch((error) => console.error(error));

    setComments(response.data);

    // ...
    getComments(postId);
  };

  const editCommentHandler = () => {
    setIsEditInputVisible(true);
  };

  // send edited comment to db
  const acceptEditHandler = () => {
    setIsEditInputVisible(false);

    const timestamp = new Date();

    editComment(formControls.body.value, timestamp, comment.id, post.id);
  };

  const cancelEditHandler = () => {
    setIsEditInputVisible(false);
  };

  const deleteCommentHandler = () => {
    setComments(
      comments.filter((commentItem) => commentItem.id !== comment.id)
    );

    deleteComment(comment.id);
  };

  // buttons
  const editButton = (
    <Button size='small' onClick={editCommentHandler}>
      Edit
    </Button>
  );
  const acceptButton = (
    <Button size='small' onClick={acceptEditHandler} disabled={!isFormValid}>
      Accept
    </Button>
  );
  const cancelButton = (
    <Button size='small' onClick={cancelEditHandler}>
      Cancel
    </Button>
  );
  const deleteCommentButton = (
    <Button danger size='small' onClick={deleteCommentHandler}>
      Delete
    </Button>
  );

  return (
    <div className={styles.Comment}>
      <div>
        <div>
          <Link to=''>
            <Avatar size='small' comment={comment} />
            {`${comment.user && comment.user.firstname}
            ${comment.user && comment.user.lastname} ${
              user && comment.user && comment.user.id === user.id ? '(you)' : ''
            }`}
          </Link>
          &nbsp;at&nbsp;
          {convertDate(new Date(comment.createdAt))}
        </div>
        <div>{i + 1}</div>
      </div>
      <div>{!isEditInputVisible ? comment.body : renderInputs()}</div>
      {user && user.id === comment.userId
        ? isEditInputVisible
          ? acceptButton
          : editButton
        : null}
      {user && user.id === comment.userId
        ? isEditInputVisible
          ? cancelButton
          : deleteCommentButton
        : null}
    </div>
  );
};

export default Comment;
