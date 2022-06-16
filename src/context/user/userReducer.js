import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_SUCCESS,
  CHANGE_AVATAR,
  GET_USER,
} from '../actionTypes';

const handlers = {
  // login
  [AUTH_LOGIN]: (state, { payload }) => ({
    ...state,
    user: payload,
  }),

  // logout
  [AUTH_LOGOUT]: (state) => ({
    ...state,
    user: null,
    token: '',
  }),

  // success
  [AUTH_SUCCESS]: (state, { payload }) => ({
    ...state,
    token: payload,
  }),

  // get user
  // // temporary solution?
  [GET_USER]: (state, { payload }) => ({
    ...state,
    user: payload,
  }),

  // change avatar
  [CHANGE_AVATAR]: (state, { payload }) => ({
    ...state,
    user: payload,
  }),
  // default
  DEFAULT: (state) => state,
};

export const userReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
