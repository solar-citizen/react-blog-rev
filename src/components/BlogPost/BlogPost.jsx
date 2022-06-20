import styles from './BlogPost.module.css';
import { Link } from 'react-router-dom';
import convertDate from '../../helpers/convertDate';

export const BlogPost = ({ posts }) => (
  <div className={styles.BlogPost}>
    {posts?.length ? (
      posts.map((post) => {
        return (
          <article key={post?.id}>
            <h2>{post?.title}</h2>
            <p>
              {post?.body?.length >= 250
                ? post?.body.substring(0, 250) + '...'
                : post?.body}
            </p>
            <div>
              {`Created at ${convertDate(new Date(post?.createdAt))} by ${
                post?.user?.firstname
              } ${post?.user?.lastname}
              `}
            </div>
            {post?.updatedAt && (
              <div>{`Updated at ${convertDate(
                new Date(post?.updatedAt)
              )}`}</div>
            )}

            <Link to={`/blog/post/${post?.id}`}>Read more</Link>
          </article>
        );
      })
    ) : (
      <div className={styles.message}>No posts here yet...</div>
    )}
  </div>
);
