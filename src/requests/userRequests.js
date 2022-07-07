import axios from 'axios';
import { baseURL, loginURL, registerURL } from '../urls';

// AUTHENTICATION
export const requestAuth = async (
  isLogin,
  email,
  password,
  firstname,
  lastname,
  age,
  avatar
) => {
  let data = { email, password };
  let url = registerURL;

  if (isLogin) {
    url = loginURL;
  } else {
    data = { email, password, firstname, lastname, age, avatar };
  }

  return axios({
    url,
    method: 'post',
    data,
  }).catch((error) => console.error(error));
};

// PROFILE EDIT
export const requestEditUser = async (
  email,
  firstname,
  lastname,
  age,
  password,
  userId,
  token
) =>
  axios({
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
  })
    .then((response) => response.data)
    .catch((error) => console.error(error));

export const requestChangeAvatar = async (avatar, userId, token) =>
  axios({
    url: `${baseURL}/users/${userId}`,
    method: 'patch',
    data: {
      avatar,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.data)
    .catch((error) => console.error(error));

// // TO BE USED (?)
// export const requestGetUser = async (userId) =>
//   axios({
//     url: `${baseURL}/users/${userId}`,
//     method: 'get',
//   })
//     .then((response) => response.data)
//     .catch((error) => console.error(error));
