import axios from 'axios';
import { baseURL } from '../urls';

export const requestGetAnnouncements = async () =>
  axios({
    method: 'get',
    url: `${baseURL}/announcements?_sort=createdAt&_order=desc&_limit=10`,
  })
    .then((response) => response.data)
    .catch((error) => console.error(error));

export const requestDeleteAnnouncement = async (announcementId, token) =>
  axios({
    method: 'delete',
    url: `${baseURL}/announcements/${announcementId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch((error) => console.error(error));

export const requestAddAnnouncement = async (
  title,
  body,
  userId,
  createdAt,
  token
) =>
  axios({
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

export const requestEditAnnouncement = async (
  body,
  updatedAt,
  announcementId,
  token
) =>
  axios({
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
