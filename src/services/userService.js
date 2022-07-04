import axios from 'axios';
import { baseURL, loginURL, registerURL } from '../urls';

export const onAuth = async (
  isLogin,
  email,
  password,
  firstname,
  lastname,
  age,
  avatar
) => {
  let authData = { email, password };
  let url = registerURL;

  if (isLogin) {
    url = loginURL;
  } else {
    authData = { email, password, firstname, lastname, age, avatar };
  }

  return await axios.post(url, authData).catch((error) => {
    console.error(error);
  });
};

export const onGetUser = async (userId, token) => {
  return await axios({
    url: `${baseURL}/users/${userId}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch((error) => console.error(error));
};

export const onSetNewUserData = async (
  email,
  firstname,
  lastname,
  age,
  password,
  userId,
  token
) => {
  return await axios({
    url: `${baseURL}/users/${userId}`,
    method: 'patch',
    data: {
      email,
      firstname,
      lastname,
      age,
      password,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch((error) => console.error(error));
};

export const onSetNewAvatar = async (avatar, userId, token) => {
  return await axios({
    url: `${baseURL}/users/${userId}`,
    method: 'patch',
    data: {
      avatar,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch((error) => console.error(error));
};
