import axios from 'axios';
import { baseURL } from '../urls';

export const requestGetPosts = async () =>
  axios({
    url: `${baseURL}/posts?_expand=user&_sort=createdAt&_order=desc&_limit=50`,
    method: 'get',
  })
    .then((response) => response.data)
    .catch((error) => console.error(error));

export const requestSearchPosts = async (value) =>
  axios({
    url: `${baseURL}/posts?_expand=user&_sort=createdAt&_order=desc&_limit=50&q=${value}`,
    method: 'get',
  })
    .then((response) => response.data)
    .catch((error) => console.error(error));

export const requestGetPost = async (postId) =>
  axios({
    url: `${baseURL}/posts/${postId}?_expand=user`,
    method: 'get',
  })
    .then((response) => response.data)
    .catch((error) => console.error(error));

export const requestEditPost = async (title, body, updatedAt, postId, token) =>
  axios({
    url: `${baseURL}/posts/${postId}`,
    method: 'patch',
    data: {
      title,
      body,
      updatedAt,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.data)
    .catch((error) => console.error(error));

export const requestDeletePost = async (postId, token) =>
  axios({
    url: `${baseURL}/posts/${postId}`,
    method: 'delete',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch((error) => console.error(error));

export const requestCreatePost = async (
  title,
  body,
  userId,
  createdAt,
  token
) =>
  axios({
    method: 'post',
    url: `${baseURL}/posts`,
    data: {
      title,
      body,
      userId,
      createdAt,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch((error) => console.error(error));
