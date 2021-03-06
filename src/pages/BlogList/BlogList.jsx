import styles from './BlogList.module.css';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader, Pagination, Search, BlogPost } from '../../components/index';
import { PlusOutlined } from '@ant-design/icons';
import UserContext from '../../context/user/userContext';
import PostsContext from '../../context/posts/postsContext';
import LoadingContext from '../../context/loading/loadingContext';

const BlogList = () => {
  const { user } = useContext(UserContext);
  const { posts } = useContext(PostsContext);
  const { loading } = useContext(LoadingContext);

  // for Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts =
    posts?.length && posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (event, pageNumber) => {
    event.preventDefault();
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.BlogList}>
      <div>
        <Search />
        {user && (
          <Link to='/create-post'>
            <span className='text-white'>
              <PlusOutlined /> Create new post
            </span>
          </Link>
        )}
      </div>

      {loading ? <Loader /> : <BlogPost posts={currentPosts} />}

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts?.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default BlogList;
