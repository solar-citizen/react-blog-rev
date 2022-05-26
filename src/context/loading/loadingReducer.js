import { SET_LOADING } from '../actionTypes';

const handlers = {
  // set loading
  [SET_LOADING]: (state) => ({ ...state, loading: true }),

  // default
  DEFAULT: (state) => state,
};

export const loadingReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
