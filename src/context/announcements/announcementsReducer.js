import {
  GET_ANNOUNCEMENTS,
  SET_ANNOUNCEMENTS,
  DELETE_ANNOUNCEMENT,
  EDIT_ANNOUNCEMENT,
  ADD_ANNOUNCEMENT,
  // GET_USER_ANNOUNCEMENTS,
} from '../actionTypes';

const handlers = {
  // GET_ANNOUNCEMENTS
  [GET_ANNOUNCEMENTS]: (state, { payload }) => ({
    ...state,
    announcements: payload,
    // loading: false,
  }),

  // SET_ANNOUNCEMENTS
  [SET_ANNOUNCEMENTS]: (state, { payload }) => ({
    ...state,
    announcements: payload,
    // loading: false,
  }),

  // ADD_ANNOUNCEMENT
  [ADD_ANNOUNCEMENT]: (state, { payload }) => ({
    ...state,
    announcements: payload,
    // loading: false,
  }),

  // DELETE_ANNOUNCEMENT
  [DELETE_ANNOUNCEMENT]: (state) => ({
    ...state,
    // announcements: payload,
    // loading: false,
  }),

  // EDIT_ANNOUNCEMENT
  [EDIT_ANNOUNCEMENT]: (state, { payload }) => ({
    ...state,
    announcements: payload,
    // loading: false,
  }),
  // default
  DEFAULT: (state) => state,
};

export const announcementsReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
