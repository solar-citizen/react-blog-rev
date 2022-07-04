import { useReducer, useContext } from 'react';
import { announcementsReducer } from './announcementsReducer';
import AnnouncementsContext from './announcementsContext';
import UserContext from '../user/userContext';

import {
  GET_ANNOUNCEMENTS,
  SET_ANNOUNCEMENTS,
  DELETE_ANNOUNCEMENT,
  EDIT_ANNOUNCEMENT,
  ADD_ANNOUNCEMENT,
} from '../actionTypes';
import {
  onAddAnnouncement,
  onDeleteAnnouncement,
  onEditAnnouncement,
  onGetAnnouncements,
} from '../../services/announcementsService';

export const AnnouncementsState = ({ children }) => {
  const initialState = {
    announcements: [],
  };
  const [state, dispatch] = useReducer(announcementsReducer, initialState);
  const { token } = useContext(UserContext);

  const getAnnouncements = async () => {
    const response = await onGetAnnouncements(token);
    dispatch({ type: GET_ANNOUNCEMENTS, payload: response.data });
  };

  const setAnnouncements = (payload) =>
    dispatch({ type: SET_ANNOUNCEMENTS, payload });

  const deleteAnnouncement = async (announcementId) => {
    await onDeleteAnnouncement(announcementId, token);
    dispatch({ type: DELETE_ANNOUNCEMENT });
  };

  const addAnnouncement = async (title, body, userId, createdAt) => {
    const response = await onAddAnnouncement(
      title,
      body,
      userId,
      createdAt,
      token
    );
    dispatch({ type: ADD_ANNOUNCEMENT, payload: response.data });
    getAnnouncements();
  };

  const editAnnouncement = async (body, updatedAt, announcementId) => {
    const response = await onEditAnnouncement(
      body,
      updatedAt,
      announcementId,
      token
    );
    dispatch({ type: EDIT_ANNOUNCEMENT, payload: response.data });
    getAnnouncements();
  };

  const { announcements } = state;

  return (
    <AnnouncementsContext.Provider
      value={{
        announcements,
        getAnnouncements,
        setAnnouncements,
        deleteAnnouncement,
        editAnnouncement,
        addAnnouncement,
      }}
    >
      {children}
    </AnnouncementsContext.Provider>
  );
};
