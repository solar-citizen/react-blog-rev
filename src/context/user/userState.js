import dayjs from 'dayjs';
import { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { userReducer } from './userReducer';
import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_SUCCESS,
  CHANGE_AVATAR,
  GET_USER,
  SET_NEW_USER_DATA,
} from '../actionTypes';
import {
  onAuth,
  onGetUser,
  onSetNewAvatar,
  onSetNewUserData,
} from '../../services/user-service';
import UserContext from './userContext';

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
    const response = await onAuth(
      isLogin,
      email,
      password,
      firstname,
      lastname,
      age,
      avatar
    );
    const data = response.data;

    // success: register 201; login 200
    if (response.status === 200 || response.status === 201) {
      const tokenExpiresIn = 3600;
      const tokenExpirationDate = dayjs(
        dayjs().valueOf() + tokenExpiresIn * 1000
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
      const tokenExpirationDate = dayjs(
        JSON.parse(localStorage.getItem('tokenExpirationDate'))
      );

      if (tokenExpirationDate <= dayjs()) {
        logout();
      } else {
        authSuccess(storedToken);
        autoLogout(
          (dayjs(tokenExpirationDate).get('ms') - dayjs().valueOf()) / 1000
        );
        login(storedUser);
      }
    }
  };

  // --- Profile edit

  // get user
  // temporary solution?
  const getUser = async (userId) => {
    const response = await onGetUser(userId, token);
    dispatch({ type: GET_USER, payload: response.data });
  };

  const setNewUserData = async (
    email,
    firstname,
    lastname,
    age,
    password,
    userId
  ) => {
    const response = await onSetNewUserData(
      email,
      firstname,
      lastname,
      age,
      password,
      userId,
      token
    );
    dispatch({ type: SET_NEW_USER_DATA, payload: response.data });
  };

  const setNewAvatar = async (avatar, userId) => {
    const response = await onSetNewAvatar(avatar, userId, token);
    dispatch({ type: CHANGE_AVATAR, payload: response.data });
    getUser(userId);
    localStorage.setItem('user', JSON.stringify(user));
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
        setNewAvatar,
        getUser,
        setNewUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
