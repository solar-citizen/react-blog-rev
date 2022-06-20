import styles from './Search.module.css';
import { useState, useContext } from 'react';
import { Button } from '../index';
import { SearchOutlined } from '@ant-design/icons';
import PostsContext from '../../context/posts/postsContext';

const Search = () => {
  const { getPosts, searchPosts } = useContext(PostsContext);

  const [value, setValue] = useState('');

  // search on enter key press
  const onSubmit = (event) => {
    if (event.key !== 'Enter') {
      return;
    }

    getPosts();

    if (value.trim()) {
      searchPosts(value.trim());
    }
  };

  // search on button click
  const searchHandler = () => {
    getPosts();

    if (value.trim()) {
      searchPosts(value.trim());
    }
  };

  return (
    <div className={styles.Search}>
      <input
        className={styles.Search}
        type='search'
        placeholder='Search for blogs'
        onKeyPress={onSubmit}
        onChange={(event) => setValue(event.target.value)}
      />

      <Button type='primary' onClick={searchHandler}>
        <SearchOutlined />
      </Button>
    </div>
  );
};

export default Search;
