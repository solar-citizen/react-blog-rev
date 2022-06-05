import { useContext } from 'react';
import UserContext from '../../context/user/userContext';

const Avatar = ({ size }) => {
  const { user } = useContext(UserContext);
  const { avatar } = user;

  if (size === 'small') {
    return <img src={avatar} width={24} alt='avatar' />;
  }

  if (size === 'large') {
    return <img src={avatar} width={100} alt='avatar' />;
  }
};

export default Avatar;
