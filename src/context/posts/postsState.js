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
  requestGetPost,
  requestGetPosts,
  requestSearchPosts,
} from '../../requests/postsRequests';
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
    const postsFromDB = await requestGetPosts();
    dispatch({
      type: GET_POSTS,
      posts: postsFromDB,
    });
  };

  // full text search
  const searchPosts = async (value) => {
    const searchedPostsFromDB = await requestSearchPosts(value);
    dispatch({
      type: SEARCH_POSTS,
      posts: searchedPostsFromDB,
    });
  };

  const getPost = async (postId) => {
    const postFromDB = await requestGetPost(postId);
    dispatch({
      type: GET_POST,
      post: postFromDB,
    });
  };

  const editPost = async (title, body, updatedAt, postId) => {
    const postFromDB = await requestEditPost(
      title,
      body,
      updatedAt,
      postId,
      token
    );
    dispatch({
      type: EDIT_POST,
      post: postFromDB,
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
