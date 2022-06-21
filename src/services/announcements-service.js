import axios from 'axios';
import { baseURL } from '../urls';

export const onGetAnnouncements = async (token) => {
  return await axios({
    method: 'get',
    url: `${baseURL}/announcements?_sort=createdAt&_order=desc&_limit=10`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch((error) => console.error(error));
};

export const onDeleteAnnouncement = async (announcementId, token) => {
  return await axios({
    method: 'delete',
    url: `${baseURL}/announcements/${announcementId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch((error) => console.error(error));
};

export const onAddAnnouncement = async (
  title,
  body,
  userId,
  createdAt,
  token
) => {
  return await axios({
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
};

export const onEditAnnouncement = async (
  body,
  updatedAt,
  announcementId,
  token
) => {
  return await axios({
    url: `${baseURL}/announcements/${announcementId}`,
    method: 'patch',
    data: {
      body,
      updatedAt,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch((error) => console.error(error));
};
