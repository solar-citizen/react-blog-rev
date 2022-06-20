import styles from './UserPosts.module.css';
import dayjs from 'dayjs';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Loader } from '../../index';
import { Button } from '../../index';
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
      return currentUserPosts.map((userPost) => {
        return (
          <article key={userPost?.id}>
            <h2>{userPost?.title}</h2>

            <p>
              {userPost?.body.length >= 250
                ? userPost?.body.substring(0, 250) + '...'
                : userPost?.body}
            </p>

            <div>
              {`Created ${dayjs(userPost?.createdAt).format(
                'ddd, D MMMM YYYY [at] HH:mm'
              )} by ${userPost?.user?.firstname} ${userPost?.user?.lastname}`}
            </div>

            {userPost?.updatedAt && (
              <div>
                {`Updated ${dayjs(userPost?.updatedAt).format(
                  'ddd, D MMMM YYYY [at] HH:mm'
                )}`}
              </div>
            )}

            <Link to={`/blog/post/${userPost?.id}`}>Go to</Link>
          </article>
        );
      });
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
