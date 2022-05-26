import axios from 'axios';
import { baseURL } from '../../urls';
import { useReducer, useContext } from 'react';
import AnnouncementsContext from './announcementsContext';
import { announcementsReducer } from './announcementsReducer';
import UserContext from '../user/userContext';

import {
  GET_ANNOUNCEMENTS,
  SET_ANNOUNCEMENTS,
  DELETE_ANNOUNCEMENT,
  EDIT_ANNOUNCEMENT,
  ADD_ANNOUNCEMENT,
} from '../actionTypes';

export const AnnouncementsState = ({ children }) => {
  const initialState = {
    announcements: [],
  };
  const [state, dispatch] = useReducer(announcementsReducer, initialState);
  const { token } = useContext(UserContext);

  const getAnnouncements = async () => {
    // setLoading();

    const response = await axios({
      method: 'get',
      url: `${baseURL}/announcements?_sort=createdAt&_order=desc&_limit=10`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch((error) => console.error(error));

    dispatch({
      type: GET_ANNOUNCEMENTS,
      payload: response.data,
    });
  };

  const setAnnouncements = (payload) =>
    dispatch({ type: SET_ANNOUNCEMENTS, payload });

  const deleteAnnouncement = (announcementID) => {
    // setLoading();

    axios({
      method: 'delete',
      url: `${baseURL}/announcements/${announcementID}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch((error) => console.error(error));

    dispatch({
      type: DELETE_ANNOUNCEMENT,
    });
  };

  const addAnnouncement = async (title, body, userId, createdAt) => {
    const response = await axios({
      url: `${baseURL}/announcements`,
      method: 'post',
      data: {
        title,
        userId,
        body,
        createdAt,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch((error) => console.error(error));

    dispatch({
      type: ADD_ANNOUNCEMENT,
      payload: response.data,
    });

    // ...
    getAnnouncements();
  };

  const editAnnouncement = async (body, updatedAt, announcementID) => {
    // setLoading();

    const response = await axios({
      url: `${baseURL}/announcements/${announcementID}`,
      method: 'patch',
      data: {
        body,
        updatedAt,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch((error) => console.error(error));

    dispatch({
      type: EDIT_ANNOUNCEMENT,
      payload: response.data,
    });

    // ...
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
