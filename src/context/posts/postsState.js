import { useReducer, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PostsContext from './postsContext';
import UserContext from '../user/userContext';
import { postsReducer } from './postsReducer';
import {
  GET_POSTS,
  SET_POSTS,
  SEARCH_POSTS,
  GET_POST,
  CREATE_POST,
  DELETE_POST,
  EDIT_POST,
} from '../actionTypes';
import {
  onCreatePost,
  onDeletePost,
  onEditPost,
  onGetPost,
  onGetPosts,
  onSearchPosts,
} from '../../services/posts-service';

export const PostsState = ({ children }) => {
  const initialState = {
    posts: [],
    // post: {},
  };
  const { token } = useContext(UserContext);
  const [state, dispatch] = useReducer(postsReducer, initialState);
  const navigate = useNavigate();

  const getPosts = async () => {
    const response = await onGetPosts(token);
    dispatch({ type: GET_POSTS, payload: response.data });
  };

  // full text search
  const searchPosts = async (value) => {
    const response = await onSearchPosts(value, token);
    dispatch({ type: SEARCH_POSTS, payload: response.data });
  };

  const setPosts = (payload) => dispatch({ type: SET_POSTS, payload });

  const getPost = async (postId) => {
    const response = await onGetPost(postId, token);
    dispatch({ type: GET_POST, payload: response.data });
  };

  const editPost = async (title, body, updatedAt, postId) => {
    const response = await onEditPost(title, body, updatedAt, postId, token);
    dispatch({ type: EDIT_POST, payload: response.data });
    setPosts(response.data);
    getPosts();
  };

  const deletePost = (postId) => {
    onDeletePost(postId, token);
    dispatch({ type: DELETE_POST });
    navigate('/', { replace: true });
    // setPosts(getPosts());
  };

  const createPost = async (title, body, userId, createdAt) => {
    const response = await onCreatePost(title, body, userId, createdAt, token);
    const newPosts = [...posts];
    newPosts.push(response.data);
    console.log(response.data);
    dispatch({ type: CREATE_POST, payload: newPosts });
    getPosts();
  };

  const { posts, post } = state;

  return (
    <PostsContext.Provider
      value={{
        getPosts,
        setPosts,
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
