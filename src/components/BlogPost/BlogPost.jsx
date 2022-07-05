import styles from './BlogPost.module.css';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

const BlogPost = ({ posts, current }) => (
  <div className={styles.BlogPost}>
    {posts?.length ? (
      posts.map((post) => {
        const postCreationDate = dayjs(post?.createdAt).format(
          'ddd, D MMMM YYYY [at] HH:mm'
        );

        const postUpdatedDate = dayjs(post?.updatedAt).format(
          'ddd, D MMMM YYYY [at] HH:mm'
        );

        return (
          <article key={post?.id} className='bg-white'>
            <h2>{post?.title}</h2>

            <p>
              {post?.body?.length >= 250
                ? post?.body.substring(0, 250) + '...'
                : post?.body}
            </p>

            <div>{`Created: ${postCreationDate} by ${post?.user?.firstname} ${post?.user?.lastname}`}</div>

            {post?.updatedAt && <div>{`Updated: ${postUpdatedDate}`}</div>}

            <Link to={`/blog/post/${post?.id}`}>
              {current ? 'Go to' : 'Read more'}
            </Link>
          </article>
        );
      })
    ) : (
      <div className={`${styles.message} bg-white`}>No posts here yet...</div>
    )}
  </div>
);

export default BlogPost;
