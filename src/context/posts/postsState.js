import { useReducer, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { postsReducer } from './postsReducer';
import {
  GET_POSTS,
  SEARCH_POSTS,
  GET_POST,
  EDIT_POST,
} from './postsActionTypes';
import {
  requestCreatePost,
  requestDeletePost,
  requestEditPost,
  requestPost,
  requestPosts,
  requestSearchPosts,
} from '../../services/postsService';
import UserContext from '../user/userContext';
import PostsContext from './postsContext';

export const PostsState = ({ children }) => {
  const initialState = {
    posts: [],
  };
  const [state, dispatch] = useReducer(postsReducer, initialState);
  const navigate = useNavigate();

  const { token } = useContext(UserContext);

  const getPosts = async () => {
    const posts = await requestPosts(token);
    dispatch({
      type: GET_POSTS,
      posts,
    });
  };

  // full text search
  const searchPosts = async (value) => {
    const posts = await requestSearchPosts(value, token);
    dispatch({
      type: SEARCH_POSTS,
      posts,
    });
  };

  const getPost = async (postId) => {
    const post = await requestPost(postId, token);
    dispatch({
      type: GET_POST,
      post,
    });
  };

  const editPost = async (title, body, updatedAt, postId) => {
    const post = await requestEditPost(title, body, updatedAt, postId, token);
    dispatch({
      type: EDIT_POST,
      post,
    });
    getPosts();
  };

  const deletePost = async (postId) => {
    await requestDeletePost(postId, token);
    navigate('/', { replace: true });
    getPosts();
  };

  const createPost = async (title, body, userId, createdAt) => {
    await requestCreatePost(title, body, userId, createdAt, token);
    getPosts();
  };

  const { posts, post } = state;

  return (
    <PostsContext.Provider
      value={{
        getPosts,
        searchPosts,
        getPost,
        editPost,
        deletePost,
        createPost,
        posts,
        post,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
