import styles from './BlogList.module.css';
import Search from '../../components/Search/Search';
import { Link } from 'react-router-dom';
import BlogPost from '../../components/BlogPost/BlogPost';
import Loader from '../../components/UI/Loader/Loader';
import PostsContext from '../../context/posts/postsContext';
import { useContext, useState } from 'react';
import Pagination from '../../components/UI/Pagination/Pagination';
import { PlusOutlined } from '@ant-design/icons';
import UserContext from '../../context/user/userContext';
import LoadingContext from '../../context/loading/loadingContext';

const BlogList = () => {
  const { user } = useContext(UserContext);
  const { posts } = useContext(PostsContext);
  const { loading } = useContext(LoadingContext);

  // console.log(posts);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts =
    posts && posts.length && posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (e, pageNumber) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.BlogList}>
      <div>
        <Search />
        {user ? (
          <Link to='/create-post'>
            <span>
              <PlusOutlined /> Create new post
            </span>
          </Link>
        ) : (
          ''
        )}
      </div>

      {loading ? <Loader /> : <BlogPost posts={currentPosts} />}

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default BlogList;
