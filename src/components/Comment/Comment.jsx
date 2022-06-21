import styles from './Comment.module.css';
import dayjs from 'dayjs';
import { useContext, useState } from 'react';
import PostsContext from '../../context/posts/postsContext';
import { Link } from 'react-router-dom';
import { Input } from '../index';
import { Button } from '../index';
import UserContext from '../../context/user/userContext';
import { Avatar } from '../index';
import { deleteComment, editComment } from '../../services/comments-service';

const Comment = ({ comments, setComments, onGetComments, comment, i }) => {
  const { user } = useContext(UserContext);
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

  const onEditComment = async (body, updatedAt, commentId, postId) => {
    const response = await editComment(body, updatedAt, commentId);
    setComments(response.data);
    onGetComments(postId);
  };

  const editCommentHandler = () => {
    setIsEditInputVisible(true);
  };

  // send edited comment to db
  const acceptEditHandler = () => {
    setIsEditInputVisible(false);
    onEditComment(formControls?.body?.value, dayjs(), comment?.id, post?.id);
  };

  const cancelEditHandler = () => {
    setIsEditInputVisible(false);
  };

  const deleteCommentHandler = () => {
    setComments(
      comments.filter((commentItem) => commentItem?.id !== comment?.id)
    );
    deleteComment(comment?.id);
  };

  // buttons
  const editButton = (
    <Button type='primary' size='small' onClick={editCommentHandler}>
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
    <Button type='danger' size='small' onClick={deleteCommentHandler}>
      Delete
    </Button>
  );

  return (
    <div className={styles.Comment}>
      <div>
        <div>
          <Link to=''>
            <Avatar size='small' comment={comment} />
            {`${comment?.user?.firstname}
            ${comment?.user?.lastname} ${
              comment?.user?.id === user?.id ? '(You)' : ''
            }`}
          </Link>

          {` at ${dayjs(comment?.createdAt).format('HH:mm, DD.MM.YYYY')} ${
            comment?.updatedAt
              ? `(last update: ${dayjs(comment?.updatedAt).format(
                  'HH:mm, DD.MM.YYYY'
                )})`
              : ''
          }`}
        </div>
        <div>{i + 1}</div>
      </div>
      <div>{!isEditInputVisible ? comment?.body : renderInputs()}</div>
      {user?.id === comment?.userId &&
        (isEditInputVisible ? acceptButton : editButton)}
      {user?.id === comment?.userId &&
        (isEditInputVisible ? cancelButton : deleteCommentButton)}
    </div>
  );
};

export default Comment;
