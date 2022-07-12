import dayjs from 'dayjs';
import { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { userReducer } from './userReducer';
import {
  LOGIN,
  LOGOUT,
  UPDATE_ACCESSTOKEN,
  CHANGE_AVATAR,
  // GET_USER,
  EDIT_USER,
} from './userActionTypes';
import {
  requestAuth,
  // requestGetUser,
  requestChangeAvatar,
  requestEditUser,
} from '../../requests/userRequests';
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

  // AUTHENTICATION
  const auth = async (isLogin, ...inputValues) => {
    const response = await requestAuth(isLogin, ...inputValues);
    const data = response?.data;

    // success: register 201; login 200
    if (response?.status === 200 || response?.status === 201) {
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

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', JSON.stringify(data.accessToken));
      localStorage.setItem(
        'tokenExpirationDate',
        JSON.stringify(tokenExpirationDate)
      );

      login(user);
      updateAccessToken(data.accessToken);
      autoLogout(tokenExpiresIn);
      navigate('/', { replace: true });
    } else {
      alert(data);
    }
  };

  const login = (user) =>
    dispatch({
      type: LOGIN,
      user,
    });

  const logout = (withRedirrect) => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpirationDate');

    dispatch({
      type: LOGOUT,
    });

    if (withRedirrect) {
      navigate('/', { replace: true });
    }
  };

  const updateAccessToken = (token) => {
    dispatch({
      type: UPDATE_ACCESSTOKEN,
      token,
    });
  };

  const autoLogout = (time) => {
    setTimeout(() => {
      logout();
    }, time * 1000);
  };

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
        updateAccessToken(storedToken);
        autoLogout(
          (dayjs(tokenExpirationDate).get('ms') - dayjs().valueOf()) / 1000
        );
        login(storedUser);
      }
    }
  };

  // PROFILE EDIT
  const editUser = async (
    email,
    firstname,
    lastname,
    age,
    password,
    userId
  ) => {
    const user = await requestEditUser(
      email,
      firstname,
      lastname,
      age,
      password,
      userId,
      token
    );

    dispatch({
      type: EDIT_USER,
      user,
    });
  };

  const changeAvatar = async (avatar, userId) => {
    const user = await requestChangeAvatar(avatar, userId, token);
    dispatch({
      type: CHANGE_AVATAR,
      user,
    });
  };

  // // TO BE USED (?)
  //  const getUser = async (userId) => {
  //    const user = await requestGetUser(userId);
  //    dispatch({
  //      type: GET_USER,
  //      user,
  //    });
  //  };

  const { user, token } = state;

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        logout,
        autoLogin,
        auth,
        changeAvatar,
        // getUser,
        editUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
