import axios from 'axios';
import { baseURL } from '../urls';

export const requestGetComments = async (postId) =>
  axios({
    url: `${baseURL}/comments?_expand=user&postId=${postId}&_sort=createdAt&_order=asc`,
    method: 'get',
  })
    .then((response) => response.data)
    .catch((error) => console.error(error));

export const requestAddComment = async (
  body,
  createdAt,
  postId,
  userId,
  token
) =>
  axios({
    url: `${baseURL}/comments`,
    method: 'post',
    data: {
      body,
      createdAt,
      postId,
      userId,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch((error) => console.error(error));

export const requestDeleteComment = async (commentId, token) =>
  axios({
    url: `${baseURL}/comments/${commentId}`,
    method: 'delete',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch((error) => console.error(error));

export const requestEditComment = async (body, updatedAt, commentId, token) =>
  axios({
    url: `${baseURL}/comments/${commentId}`,
    method: 'patch',
    data: {
      body,
      updatedAt,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch((error) => console.error(error));
