import { useReducer, useContext } from 'react';
import { announcementsReducer } from './announcementsReducer';
import AnnouncementsContext from './announcementsContext';
import UserContext from '../user/userContext';

import {
  GET_ANNOUNCEMENTS,
  SET_ANNOUNCEMENTS,
} from './announcementsActionTypes';
import {
  requestAddAnnouncement,
  requestDeleteAnnouncement,
  requestEditAnnouncement,
  requestGetAnnouncements,
} from '../../services/announcementsService';

export const AnnouncementsState = ({ children }) => {
  const initialState = {
    announcements: [],
  };
  const [state, dispatch] = useReducer(announcementsReducer, initialState);
  const { token } = useContext(UserContext);

  const getAnnouncements = async () => {
    const announcements = await requestGetAnnouncements(token);
    dispatch({
      type: GET_ANNOUNCEMENTS,
      announcements,
    });
  };

  const setAnnouncements = (announcements) =>
    dispatch({
      type: SET_ANNOUNCEMENTS,
      announcements,
    });

  const deleteAnnouncement = async (announcementId) => {
    await requestDeleteAnnouncement(announcementId, token);
    getAnnouncements();
  };

  const addAnnouncement = async (title, body, userId, createdAt) => {
    await requestAddAnnouncement(title, body, userId, createdAt, token);
    getAnnouncements();
  };

  const editAnnouncement = async (body, updatedAt, announcementId) => {
    await requestEditAnnouncement(body, updatedAt, announcementId, token);
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
