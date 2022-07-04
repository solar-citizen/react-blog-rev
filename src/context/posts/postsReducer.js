import {
  GET_POSTS,
  SEARCH_POSTS,
  // GET_POSTS_RELATED_USER,
  GET_POST,
  DELETE_POST,
  SET_POSTS,
  EDIT_POST,
  CREATE_POST,
} from './postsActionTypes';

const handlers = {
  // get posts
  [GET_POSTS]: (state, { payload }) => ({
    ...state,
    posts: payload,
    // loading: false,
  }),

  // search posts
  [SEARCH_POSTS]: (state, { payload }) => ({
    ...state,
    posts: payload,
    // loading: false,
  }),

  // set posts
  [SET_POSTS]: (state, { payload }) => ({
    ...state,
    posts: payload,
    // loading: false,
  }),

  // // GET_POSTS_RELATED_USER
  // [GET_POSTS_RELATED_USER]: (state, { payload }) => ({
  //   ...state,
  //   posts: payload,
  //   loading: false,
  // }),

  // get post
  [GET_POST]: (state, { payload }) => ({
    ...state,
    post: payload,
    // loading: false,
  }),

  // edit single post
  [EDIT_POST]: (state, { payload }) => ({
    ...state,
    post: payload,
    // loading: false,
  }),

  // create post
  [CREATE_POST]: (state, { payload }) => ({
    ...state,
    posts: payload,
    // loading: false,
  }),

  // delete post
  [DELETE_POST]: (state) => ({
    ...state,
    // loading: false,
  }),

  // default
  DEFAULT: (state) => state,
};

export const postsReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
