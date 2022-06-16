import styles from './Avatar.module.css';
import { useContext } from 'react';
import UserContext from '../../context/user/userContext';
import avatarBlank from '../../assets/img/avatars/avatarBlank.png';

const Avatar = ({ size, comment }) => {
  const { user } = useContext(UserContext);

  const userAvatar = () => {
    const src = () => {
      if (!user?.avatar && !comment) {
        return avatarBlank;
      }

      if (user && !comment) {
        return user?.avatar;
      }

      if (!comment?.user?.avatar) {
        return avatarBlank;
      }

      if (comment) {
        return comment?.user?.avatar;
      }
    };

    if (!size) {
      return <img src={src()} width={64} alt='avatar' />;
    }

    if (size === 'small') {
      return <img src={src()} width={24} alt='avatar' />;
    }

    if (size === 'large') {
      return <img src={src()} width={100} alt='avatar' />;
    }
  };

  return <div className={styles.Avatar}>{userAvatar()}</div>;
};

export default Avatar;
