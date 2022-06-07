// example future link for axios:
// 'https://ekreative-json-server.herokuapp.com/posts?_page=1&_limit=2';
import axios from 'axios';
import { baseURL } from '../../urls';
import { useReducer, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PostsContext from './postsContext';
// import LoadingContext from '../loading/loadingContext';
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

export const PostsState = ({ children }) => {
  const initialState = {
    posts: [],
    post: {},
  };
  const { token } = useContext(UserContext);
  // const { setLoading } = useContext(LoadingContext);
  const [state, dispatch] = useReducer(postsReducer, initialState);
  const navigate = useNavigate();

  // get posts from db
  const getPosts = async () => {
    // setLoading();

    const response = await axios({
      url: `${baseURL}/posts?_expand=user`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch((error) => {
      console.error(error);
    });

    dispatch({
      type: GET_POSTS,
      payload: response.data,
    });
  };

  // full text search in posts
  const searchPosts = async (value) => {
    // setLoading();

    const response = await axios({
      url: `${baseURL}/posts?_expand=user&q=${value}`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch((error) => {
      console.error(error);
    });

    dispatch({
      type: SEARCH_POSTS,
      payload: response.data,
    });
  };

  const setPosts = (payload) => dispatch({ type: SET_POSTS, payload });

  // get single post
  const getPost = async (postId) => {
    // setLoading();

    const response = await axios({
      url: `${baseURL}/posts/${postId}?_expand=user`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: GET_POST,
      payload: response.data,
    });
  };

  // edit post
  const editPost = async (title, body, updatedAt, postId) => {
    // setLoading();

    const response = await axios({
      url: `${baseURL}/posts/${postId}`,
      method: 'patch',
      data: {
        title,
        body,
        updatedAt,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch((error) => console.error(error));

    dispatch({
      type: EDIT_POST,
      payload: response.data,
    });

    setPosts(response.data);

    // ...
    getPosts();
  };

  // delete post
  const deletePost = (postId) => {
    // setLoading();

    axios({
      url: `${baseURL}/posts/${postId}`,
      method: 'delete',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch((error) => console.error(error));

    dispatch({ type: DELETE_POST });

    navigate('/', { replace: true });

    // setPosts(getPosts());
  };

  // create post
  const createPost = async (title, body, userId, createdAt) => {
    const response = await axios({
      method: 'post',
      url: `${baseURL}/posts`,
      data: {
        title,
        body,
        userId,
        createdAt,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch((error) => console.error(error));

    const clonedPosts = [...posts];
    clonedPosts.push(response.data);

    dispatch({
      type: CREATE_POST,
      payload: clonedPosts,
    });

    // console.log('respdata', response.data);

    // getPosts();
    // setPosts(getPosts());
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
