import {
  LOGIN,
  LOGOUT,
  UPDATE_ACCESSTOKEN,
  CHANGE_AVATAR,
  GET_USER,
  EDIT_USER,
} from './userActionTypes';

const handlers = {
  // AUTHENTICATION
  [LOGIN]: (state, { user }) => ({
    ...state,
    user,
  }),

  [LOGOUT]: (state) => ({
    ...state,
    user: null,
    token: '',
  }),

  [UPDATE_ACCESSTOKEN]: (state, { token }) => ({
    ...state,
    token,
  }),

  // PROFILE EDIT
  [GET_USER]: (state, { user }) => ({
    ...state,
    user,
  }),

  [EDIT_USER]: (state, { user }) => ({
    ...state,
    user,
  }),

  [CHANGE_AVATAR]: (state, { user }) => ({
    ...state,
    user,
  }),

  DEFAULT: (state) => state,
};

export const userReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
