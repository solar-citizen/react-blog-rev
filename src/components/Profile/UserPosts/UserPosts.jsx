import styles from './UserPosts.module.css';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Loader, Button, BlogPost } from '../../index';
import { PlusOutlined } from '@ant-design/icons';
import PostsContext from '../../../context/posts/postsContext';
import UserContext from '../../../context/user/userContext';
import LoadingContext from '../../../context/loading/loadingContext';

const UserPosts = () => {
  const { user } = useContext(UserContext);
  const { posts } = useContext(PostsContext);
  const { loading } = useContext(LoadingContext);

  // conditional render of posts
  // made by logged user
  const renderUserPosts = () => {
    const currentUserPosts =
      posts?.length &&
      posts.filter((postItem) => postItem?.userId === user?.id);

    if (loading) {
      return <Loader />;
    }

    if (!currentUserPosts?.length) {
      return <span>No posts here yet...</span>;
    }

    if (currentUserPosts) {
      return <BlogPost posts={currentUserPosts} current />;
    }
  };

  return (
    <div className={styles.UserPosts}>
      <h2>My posts</h2>

      <Button type='primary-filled'>
        <Link to='/create-post' className='text-white'>
          <PlusOutlined /> Create new post
        </Link>
      </Button>

      {renderUserPosts()}
    </div>
  );
};

export default UserPosts;
