import styles from './MyProfile.module.css';
import { useContext, useState, useEffect } from 'react';
import UserContext from '../../../context/user/userContext';
import Avatar from '../../Avatar/Avatar';
import SelectAvatar from '../../SelectAvatar/SelectAvatar';

const MyProfile = () => {
  const [profileImage, setProfileImage] = useState(<Avatar />);

  const { user, getUser } = useContext(UserContext);
  const { email, firstname, lastname, age, avatar } = user;

  // temporary solution?
  useEffect(() => {
    getUser(user?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const imageChangeHandler = (profileImg) => {
    setProfileImage(profileImg);
  };

  return (
    <div className={styles.MyProfile}>
      <h2>My profile</h2>

      <div styles={{ lineHeight: 0 }}>
        {/* <Avatar size='large' /> */}
        {
          <SelectAvatar
            imageChangeHandler={imageChangeHandler}
            profileImage={profileImage}
            setProfileImage={setProfileImage}
            currentAvatar={avatar}
            edit
          />
        }
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
