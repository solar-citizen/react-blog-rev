import styles from './MyProfile.module.css';
import { useContext } from 'react';
import UserContext from '../../../context/user/userContext';
import Avatar from '../../Avatar/Avatar';

const MyProfile = () => {
  const { user } = useContext(UserContext);
  const { email, firstname, lastname, age } = user;

  return (
    <div className={styles.MyProfile}>
      <h2>My profile</h2>

      <div>
        <Avatar size='large' />
        <span>
          {firstname} {lastname}
        </span>
      </div>
      <span>
        <b>Email:</b> {email}
      </span>
      <span>
        <b>Age:</b> {age}
      </span>
    </div>
  );
};

export default MyProfile;