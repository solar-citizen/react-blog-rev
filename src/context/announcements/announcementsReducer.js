import {
  GET_ANNOUNCEMENTS,
  SET_ANNOUNCEMENTS,
} from './announcementsActionTypes';

const handlers = {
  [GET_ANNOUNCEMENTS]: (state, { announcements }) => ({
    ...state,
    announcements,
    // loading: false,
  }),

  [SET_ANNOUNCEMENTS]: (state, { announcements }) => ({
    ...state,
    announcements,
    // loading: false,
  }),

  DEFAULT: (state) => state,
};

export const announcementsReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
