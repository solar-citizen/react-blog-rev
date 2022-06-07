import styles from './Post.module.css';
import { baseURL } from '../../urls';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostsContext from '../../context/posts/postsContext';
import Loader from '../../components/UI/Loader/Loader';
import convertDate from '../../helpers/convertDate';
import { Button, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import CommentSection from '../../components/CommentSection/CommentSection';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Input from '../../components/UI/Input/Input';
import UserContext from '../../context/user/userContext';
import LoadingContext from '../../context/loading/loadingContext';

const Post = () => {
  const { user, token } = useContext(UserContext);
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
    // setLoading();

    const response = await axios({
      method: 'get',
      url: `${baseURL}/comments?_expand=user&postId=${postId}&_sort=createdAt&_order=asc`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch((error) => console.error(error));

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
    const timestamp = new Date();
    editPost(
      formControls?.title?.value,
      formControls?.body?.value,
      timestamp,
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
    <Button
      onClick={showDeleteConfirm}
      type='primary'
      danger
      icon={<DeleteOutlined />}
    >
      Delete Post
    </Button>
  );
  const editPostBtn = <Button onClick={showEditInput}>Edit Post</Button>;
  const acceptButton = (
    <Button onClick={acceptEditHandler} disabled={!isFormValid}>
      Accept
    </Button>
  );
  const cancelButton = <Button onClick={cancelEditHandler}>Cancel</Button>;

  return (
    <>
      <div className={styles.Post}>
        {isEditInputVisible ? (
          renderInputs()
        ) : (
          <>
            <h2>{post?.title}</h2>

            <p>{post?.body}</p>
          </>
        )}

        <div>
          {isEditInputVisible ? (
            ''
          ) : (
            <div>
              <div>{`Created at ${convertDate(new Date(post?.createdAt))} by ${
                post?.user?.firstname
              } ${post?.user?.lastname}`}</div>
              {post?.updatedAt ? (
                <div>{`Updated at ${convertDate(
                  new Date(post?.updatedAt)
                )}`}</div>
              ) : null}
            </div>
          )}

          {user?.id === post?.userId
            ? isEditInputVisible
              ? acceptButton
              : editPostBtn
            : null}
          {user?.id === post?.userId
            ? isEditInputVisible
              ? cancelButton
              : deletePostBtn
            : null}
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
