import styles from './CommentSection.module.css';
import dayjs from 'dayjs';
import { useContext, useState } from 'react';
import { Loader, Comment, Button, Input } from '../index';
import UserContext from '../../context/user/userContext';
import PostsContext from '../../context/posts/postsContext';
import LoadingContext from '../../context/loading/loadingContext';
import { requestAddComment } from '../../services/commentsService';

const CommentSection = ({ comments, setComments, getComments }) => {
  const { user, token } = useContext(UserContext);
  const { loading } = useContext(LoadingContext);
  const { post } = useContext(PostsContext);

  const [isFormValid, setIsFormValid] = useState(false);
  const [formControls, setFormControls] = useState({
    body: {
      value: '',
      type: 'textarea',
      errorMessage: 'Comment cannot be empty.',
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

  const addComment = async (body, createdAt, postId, userId) => {
    const response = await requestAddComment(
      body,
      createdAt,
      postId,
      userId,
      token
    );
    setComments(response.data);
    getComments(postId);
    setFormControls({ ...formControls }, (formControls.body.value = ''));
  };

  // send comment to db
  const writeCommentHandler = () => {
    addComment(formControls.body.value, dayjs(), post.id, user.id);
  };

  // render comments conditionally
  const renderComments = () => {
    if (loading) {
      return <Loader />;
    }

    if (!comments?.length) {
      return <div className={styles.message}>No comments here yet...</div>;
    }

    if (comments?.length) {
      return comments.map((comment, i) => (
        <Comment
          comments={comments}
          setComments={setComments}
          getComments={getComments}
          comment={comment}
          key={comment.id}
          i={i}
        />
      ));
    }
  };

  return (
    <div className={`${styles.CommentSection} bg-white`}>
      <h2>Comments:</h2>

      {user ? (
        <div>
          <h3>Write a comment</h3>
          {renderInputs()}
          <Button
            type='primary-filled'
            onClick={writeCommentHandler}
            disabled={!isFormValid}
          >
            Write
          </Button>
        </div>
      ) : (
        ''
      )}

      {renderComments()}
    </div>
  );
};

export default CommentSection;
