import styles from './Post.module.css';
import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { requestGetComments } from '../../requests/commentsRequests';
import { Button, Loader, CommentSection } from '../../components/index';
import { Modal } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import UserContext from '../../context/user/userContext';
import PostsContext from '../../context/posts/postsContext';
import LoadingContext from '../../context/loading/loadingContext';
import { useForm } from 'react-hook-form';

const Post = () => {
  const [comments, setComments] = useState([]);
  const [isEditInputVisible, setIsEditInputVisible] = useState(false);

  const { user } = useContext(UserContext);
  const { post, getPost, deletePost, editPost } = useContext(PostsContext);
  const { loading } = useContext(LoadingContext);
  const { confirm } = Modal;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      postTitle: post?.title,
      postBody: post?.body,
    },
  });

  const params = useParams();
  const urlId = params.id;

  useEffect(() => {
    getPost(urlId);
    getComments(urlId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getComments = async (postId) => {
    const commentsFromDB = await requestGetComments(postId);
    setComments(commentsFromDB);
  };

  if (loading) {
    return <Loader />;
  }

  const deletePostHandler = () => {
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

  const submitEditHandler = (data) => {
    const { postTitle, postBody } = data;
    editPost(postTitle, postBody, dayjs(), urlId);
    setIsEditInputVisible(false);
  };

  const cancelEditHandler = () => {
    setIsEditInputVisible(false);
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit((data) => submitEditHandler(data))}>
      <label htmlFor='postTitle' className='label'>
        Edit Title
      </label>
      <input
        id='postTitle'
        {...register('postTitle', {
          required: 'This field cannot be empty.',
        })}
      />
      <span className='error-msg' role='alert'>
        {errors?.postTitle?.message}
      </span>

      <label htmlFor='postBody' className='label'>
        Edit Body
      </label>
      <textarea
        // type='textarea'
        id='postBody'
        {...register('postBody', {
          required: 'This field cannot be empty.',
        })}
      />
      <span className='error-msg' role='alert'>
        {errors?.postBody?.message}
      </span>

      <div className={styles.postButtons}>
        {user?.id === post?.userId && acceptButton}
        {user?.id === post?.userId && cancelButton}
      </div>
    </form>
  );

  // buttons
  const deletePostBtn = (
    <Button onClick={showDeleteConfirm} type='button' category='danger-filled'>
      <DeleteOutlined />
      &nbsp; Delete Post
    </Button>
  );
  const editPostBtn = (
    <Button type='button' category='primary' onClick={showEditInput}>
      Edit Post
    </Button>
  );
  const acceptButton = (
    <Button type='submit' category='primary' disabled={!isValid}>
      Accept
    </Button>
  );
  const cancelButton = (
    <Button type='button' category='primary' onClick={cancelEditHandler}>
      Cancel
    </Button>
  );

  const postCreationDate = dayjs(post?.createdAt).format(
    'ddd, D MMMM YYYY [at] HH:mm'
  );

  const postUpdateDate = dayjs(post?.updatedAt).format(
    'ddd, D MMMM YYYY [at] HH:mm'
  );

  return (
    <>
      <div className={`${styles.Post} bg-white`}>
        {isEditInputVisible ? (
          renderForm()
        ) : (
          <>
            <h2>{post?.title}</h2>

            <p>{post?.body}</p>
          </>
        )}

        {!isEditInputVisible && (
          <div>
            <div>
              <div>
                {`Created: ${postCreationDate} by ${post?.user?.firstname} ${post?.user?.lastname}`}
              </div>

              {post?.updatedAt && <div>{`Updated: ${postUpdateDate}`}</div>}
            </div>

            <div className={styles.postButtons}>
              {user?.id === post?.userId && editPostBtn}
              {user?.id === post?.userId && deletePostBtn}
            </div>
          </div>
        )}
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
