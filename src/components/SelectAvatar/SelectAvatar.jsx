import styles from './SelectAvatar.module.css';
import { useState, useContext } from 'react';
import { avatars } from './avatars';
import { Avatar, Button, Modal } from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import UserContext from '../../context/user/userContext';

const SelectAvatar = ({
  imageChangeHandler,
  profileImage,
  setProfileImage,
  edit,
  currentAvatar,
}) => {
  const { user, changeAvatar } = useContext(UserContext);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const userAvatars = [
    avatars.avatar1,
    avatars.avatar2,
    avatars.avatar3,
    avatars.avatar4,
    avatars.avatar5,
    avatars.avatar6,
    avatars.avatar7,
    avatars.avatar8,
    avatars.avatar9,
    avatars.avatar10,
  ];

  const showModalHandler = () => {
    setIsModalVisible(true);
  };

  const modalOkHandler = () => {
    setIsModalVisible(false);

    if (edit) {
      changeAvatar(profileImage, user?.id);
    }
  };

  const cancelHandler = () => {
    setIsModalVisible(false);
    setProfileImage(<UserOutlined />);

    if (edit) {
      setIsModalVisible(false);
      setProfileImage(currentAvatar);
    }
  };

  // buttons
  const selectAvatarButton = (
    <Button onClick={showModalHandler} type='button' category='primary'>
      Select Avatar
    </Button>
  );

  const editAvatarButton = (
    <Button className={styles.editBtn} onClick={showModalHandler}>
      <EditOutlined />
    </Button>
  );

  return (
    <div className={styles.SelectAvatar}>
      <Avatar
        size={edit ? 100 : 64}
        icon={<UserOutlined />}
        src={profileImage}
      />
      {!edit && selectAvatarButton}
      {edit && editAvatarButton}
      <Modal
        title='Pick An Avatar:'
        visible={isModalVisible}
        centered
        onOk={modalOkHandler}
        onCancel={cancelHandler}
      >
        {userAvatars.map((src, i) => (
          <img
            id={i}
            key={i}
            src={src}
            alt={`avatar-${i}`}
            onClick={() => imageChangeHandler(src)}
          />
        ))}
      </Modal>
    </div>
  );
};

export default SelectAvatar;
