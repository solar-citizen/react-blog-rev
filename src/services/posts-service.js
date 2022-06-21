import axios from 'axios';
import { baseURL } from '../urls';

export const onGetPosts = async (token) => {
  return await axios({
    url: `${baseURL}/posts?_expand=user&_sort=createdAt&_order=desc&_limit=50`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch((error) => console.error(error));
};

export const onSearchPosts = async (value, token) => {
  return await axios({
    url: `${baseURL}/posts?_expand=user&q=${value}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch((error) => console.error(error));
};

export const onGetPost = async (postId, token) => {
  return await axios({
    url: `${baseURL}/posts/${postId}?_expand=user`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch((error) => console.error(error));
};

export const onEditPost = async (title, body, updatedAt, postId, token) => {
  return await axios({
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
  }).catch((error) => console.error(error));
};

export const onDeletePost = async (postId, token) => {
  return await axios({
    url: `${baseURL}/posts/${postId}`,
    method: 'delete',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch((error) => console.error(error));
};

export const onCreatePost = async (title, body, userId, createdAt, token) => {
  return await axios({
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
};
