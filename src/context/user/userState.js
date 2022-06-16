import axios from 'axios';
import { baseURL, loginURL, registerURL } from '../../urls';
import { useReducer } from 'react';
import UserContext from './userContext';
import { userReducer } from './userReducer';
import { useNavigate } from 'react-router-dom';

import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_SUCCESS,
  CHANGE_AVATAR,
  GET_USER,
} from '../actionTypes';

export const UserState = ({ children }) => {
  const initialState = {
    user: {},
    token: '',
  };
  const [state, dispatch] = useReducer(userReducer, initialState);
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = JSON.parse(localStorage.getItem('token'));

  // -- AUTH
  const auth = async (
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

    const response = await axios.post(url, authData).catch((error) => {
      console.error(error);
    });

    const data = response.data;

    // make for 400 (bad request (wrong user data for login)) ???

    // success: register 201; login 200
    if (response.status === 200 || response.status === 201) {
      const tokenExpiresIn = 3600;
      const tokenExpirationDate = new Date(
        new Date().getTime() + tokenExpiresIn * 1000
      );

      const user = {
        email: data.user.email,
        id: data.user.id,
        firstname: data.user.firstname,
        lastname: data.user.lastname,
        age: data.user.age,
        avatar: data.user.avatar,
      };

      login(user);

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', JSON.stringify(data.accessToken));
      localStorage.setItem(
        'tokenExpirationDate',
        JSON.stringify(tokenExpirationDate)
      );

      navigate('/', { replace: true });
      authSuccess(data.accessToken);
      autoLogout(tokenExpiresIn);

      return true;
    } else {
      return false;
    }
  };

  // -- LOGIN
  const login = (payload) => dispatch({ type: AUTH_LOGIN, payload });

  // -- LOGOUT
  const logout = (withNavigate) => {
    dispatch({ type: AUTH_LOGOUT });

    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpirationDate');

    if (withNavigate) {
      navigate('/', { replace: true });
    }
  };

  // -- SUCCES
  const authSuccess = (token) => {
    dispatch({
      type: AUTH_SUCCESS,
      payload: token,
    });
  };

  // -- AUTO LOGOUT
  const autoLogout = (time) => {
    setTimeout(() => {
      logout();
    }, time * 1000);
  };

  // -- AUTO_LOGIN
  const autoLogin = () => {
    if (!storedToken) {
      logout();
    } else {
      const tokenExpirationDate = new Date(
        JSON.parse(localStorage.getItem('tokenExpirationDate'))
      );

      if (tokenExpirationDate <= new Date()) {
        logout();
      } else {
        authSuccess(storedToken);
        autoLogout(
          (tokenExpirationDate.getTime() - new Date().getTime()) / 1000
        );
        login(storedUser);
      }
    }
  };

  // --- Profile edit

  // get user
  // temporary solution?
  const getUser = async (userId) => {
    const response = await axios({
      url: `${baseURL}/users/${userId}`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch((error) => console.error(error));

    dispatch({
      type: GET_USER,
      payload: response.data,
    });
  };

  // change avatar
  const changeAvatar = async (avatar, userId) => {
    const response = await axios({
      url: `${baseURL}/users/${userId}`,
      method: 'patch',
      data: {
        avatar,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch((error) => console.error(error));

    dispatch({
      type: CHANGE_AVATAR,
      payload: response.data,
    });

    localStorage.setItem('user', JSON.stringify(user));

    getUser(userId);
  };

  const { user, token } = state;

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        logout,
        autoLogin,
        auth,
        authSuccess,
        changeAvatar,
        getUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
