import styles from './Post.module.css';
import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CommentSection } from '../../components/index';
import { Modal } from 'antd';
import { Input } from '../../components/index';
import { Button } from '../../components/index';
import { Loader } from '../../components/index';
import { DeleteOutlined } from '@ant-design/icons';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import PostsContext from '../../context/posts/postsContext';
import UserContext from '../../context/user/userContext';
import LoadingContext from '../../context/loading/loadingContext';
import { onGetComments } from '../../services/comments-service';

const Post = () => {
  const { user } = useContext(UserContext);
  const { post, getPost, posts, setPosts, deletePost, editPost } =
    useContext(PostsContext);
  const { loading } = useContext(LoadingContext);
  const { confirm } = Modal;

  const params = useParams();
  const urlId = params.id;

  const [comments, setComments] = useState([]);
  const [isEditInputVisible, setIsEditInputVisible] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const [formControls, setFormControls] = useState({
    title: {
      value: post?.title || '',
      type: 'text',
      label: 'Edit title',
      errorMessage: 'This field cannot be empty.',
      valid: false,
      touched: false,
      validation: {
        required: true,
      },
    },
    body: {
      value: post?.body || '',
      type: 'textarea',
      label: 'Edit post',
      errorMessage: 'This field cannot be empty.',
      valid: false,
      touched: false,
      validation: {
        required: true,
      },
    },
  });

  useEffect(() => {
    getPost(urlId, user);
    getComments(urlId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getComments = async (postId) => {
    const response = await onGetComments(postId);
    setComments(response.data);
  };

  if (loading) {
    return <Loader />;
  }

  const deletePostHandler = () => {
    setPosts(posts.filter((postsItem) => postsItem.id !== post.id));

    deletePost(urlId);
  };

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure that you want to delete this post?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      centered: true,

      onOk() {
        deletePostHandler();
      },
    });
  };

  const showEditInput = () => {
    setIsEditInputVisible(true);
  };

  const acceptEditHandler = () => {
    setIsEditInputVisible(false);
    editPost(
      formControls?.title?.value,
      formControls?.body?.value,
      dayjs(),
      urlId
    );
  };

  const cancelEditHandler = () => {
    setIsEditInputVisible(false);
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
        <div key={index}>
          <Input
            type={control.type}
            value={control.value}
            valid={control.valid}
            touched={control.touched}
            label={control.label}
            errorMessage={control.errorMessage}
            shouldValidate={!!control.validation}
            onChange={(event) => onChangeHandler(event, controlName)}
          />
        </div>
      );
    });
  };

  // buttons
  const deletePostBtn = (
    <Button onClick={showDeleteConfirm} type='danger-filled'>
      <DeleteOutlined />
      &nbsp; Delete Post
    </Button>
  );
  const editPostBtn = (
    <Button type='primary' onClick={showEditInput}>
      Edit Post
    </Button>
  );
  const acceptButton = (
    <Button type='primary' onClick={acceptEditHandler} disabled={!isFormValid}>
      Accept
    </Button>
  );
  const cancelButton = (
    <Button type='primary' onClick={cancelEditHandler}>
      Cancel
    </Button>
  );

  return (
    <>
      <div className={`${styles.Post} bg-white`}>
        {isEditInputVisible ? (
          renderInputs()
        ) : (
          <>
            <h2>{post?.title}</h2>

            <p>{post?.body}</p>
          </>
        )}

        <div>
          {!isEditInputVisible && (
            <div>
              <div>
                {`Created: ${dayjs(post?.createdAt).format(
                  'ddd, D MMMM YYYY [at] HH:mm'
                )} by ${post?.user?.firstname} ${post?.user?.lastname}`}
              </div>

              {post?.updatedAt && (
                <div>
                  {`Updated: ${dayjs(post?.updatedAt).format(
                    'ddd, D MMMM YYYY [at] HH:mm'
                  )}`}
                </div>
              )}
            </div>
          )}

          {user?.id === post?.userId &&
            (isEditInputVisible ? acceptButton : editPostBtn)}
          {user?.id === post?.userId &&
            (isEditInputVisible ? cancelButton : deletePostBtn)}
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <CommentSection
          comments={comments}
          setComments={setComments}
          getComments={getComments}
        />
      )}
    </>
  );
};

export default Post;
