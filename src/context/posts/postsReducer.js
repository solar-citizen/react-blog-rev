import {
  GET_POSTS,
  SEARCH_POSTS,
  GET_POST,
  EDIT_POST,
} from './postsActionTypes';

const handlers = {
  [GET_POSTS]: (state, { posts }) => ({
    ...state,
    posts,
    // loading: false,
  }),

  [SEARCH_POSTS]: (state, { posts }) => ({
    ...state,
    posts,
    // loading: false,
  }),

  [GET_POST]: (state, { post }) => ({
    ...state,
    post,
    // loading: false,
  }),

  [EDIT_POST]: (state, { post }) => ({
    ...state,
    post,
    // loading: false,
  }),

  DEFAULT: (state) => state,
};

export const postsReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
