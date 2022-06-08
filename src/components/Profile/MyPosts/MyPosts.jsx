import styles from './MyPosts.module.css';
import { useContext } from 'react';
import PostsContext from '../../../context/posts/postsContext';
import convertDate from '../../../helpers/convertDate';
import Loader from '../../UI/Loader/Loader';
import { Link } from 'react-router-dom';
import Button from '../../UI/Button/Button';
import { PlusOutlined } from '@ant-design/icons';
import UserContext from '../../../context/user/userContext';
import LoadingContext from '../../../context/loading/loadingContext';

const MyPosts = () => {
  const { user } = useContext(UserContext);
  const { posts } = useContext(PostsContext);
  const { loading } = useContext(LoadingContext);

  // conditional render of posts
  // made by logged user
  const renderUserPosts = () => {
    const userPosts =
      posts?.length &&
      posts.filter((postItem) => postItem?.userId === user?.id);

    if (loading) {
      return <Loader />;
    }

    if (!userPosts?.length) {
      return <span>No posts here yet...</span>;
    }

    if (userPosts) {
      return userPosts.map((userPost) => {
        return (
          <article key={userPost?.id}>
            <h2>{userPost?.title}</h2>
            <p>
              {userPost?.body.length >= 250
                ? userPost?.body.substring(0, 250) + '...'
                : userPost?.body}
            </p>
            <div>
              {`Created at ${convertDate(new Date(userPost?.createdAt))}`}
            </div>
            {userPost?.updatedAt ? (
              <div>{`Updated at ${convertDate(
                new Date(userPost?.updatedAt)
              )}`}</div>
            ) : null}

            <Link to={`/blog/post/${userPost?.id}`}>Go to</Link>
          </article>
        );
      });
    }
  };

  return (
    <div className={styles.MyPosts}>
      <h2>My posts</h2>
      <Button type='primary-filled'>
        <Link to='/create-post'>
          <PlusOutlined /> Create new post
        </Link>
      </Button>

      {renderUserPosts()}
    </div>
  );
};

export default MyPosts;
