import axios from 'axios';
import { baseURL } from '../urls';

const token = JSON.parse(localStorage.getItem('token'));

export const addComment = async (body, createdAt, postId, userId) => {
  return await axios({
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
};

export const deleteComment = (commentId) => {
  axios({
    url: `${baseURL}/comments/${commentId}`,
    method: 'delete',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editComment = async (body, updatedAt, commentId) => {
  return await axios({
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
};
