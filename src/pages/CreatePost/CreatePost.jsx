import styles from './CreatePost.module.css';
import dayjs from 'dayjs';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/index';
import UserContext from '../../context/user/userContext';
import PostsContext from '../../context/posts/postsContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createPostSchema } from '../../schemas/index';

const CreatePost = () => {
  const { user } = useContext(UserContext);
  const { createPost } = useContext(PostsContext);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createPostSchema),
    defaultValues: {
      title: '',
      body: '',
    },
  });
  const navigate = useNavigate();

  console.log(errors);

  const submitHandler = (data) => {
    const { title, body } = data;
    createPost(title, body, user.id, dayjs());

    setValue('title', '');
    setValue('body', '');

    // may be delay should be deleted with real server
    // or just deleted
    setTimeout(() => {
      navigate('/');
    }, 300);
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit((data) => submitHandler(data))}>
      <h1>Create new post</h1>

      <label htmlFor='title' className='label'>
        Post title
      </label>
      <input id='title' {...register('title')} />
      <span className='error-msg' role='alert'>
        {errors?.title?.message}
      </span>

      <label htmlFor='body' className='label'>
        Post text
      </label>
      <textarea id='body' {...register('body')} />
      <span className='error-msg' role='alert'>
        {errors?.body?.message}
      </span>

      <Button type='submit' category='create'>
        Create
      </Button>
    </form>
  );

  return <div className={styles.CreatePost}>{renderForm()}</div>;
};

export default CreatePost;
