import styles from './Avatar.module.css';
import { useContext } from 'react';
import UserContext from '../../context/user/userContext';

const Avatar = ({ size }) => {
  const { user } = useContext(UserContext);
  const { avatar } = user;

  const userAvatar = () => {
    if (size === 'small') {
      return <img src={avatar} width={24} alt='avatar' />;
    }

    if (size === 'large') {
      return <img src={avatar} width={100} alt='avatar' />;
    }
  };

  return <div className={styles.Avatar}>{userAvatar()}</div>;
};

export default Avatar;
