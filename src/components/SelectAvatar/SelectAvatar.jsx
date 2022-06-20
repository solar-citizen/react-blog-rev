import styles from './SelectAvatar.module.css';
import avatar1 from '../../assets/img/avatars/avatar1.png';
import avatar2 from '../../assets/img/avatars/avatar2.png';
import avatar3 from '../../assets/img/avatars/avatar3.png';
import avatar4 from '../../assets/img/avatars/avatar4.png';
import avatar5 from '../../assets/img/avatars/avatar5.png';
import avatar6 from '../../assets/img/avatars/avatar6.png';
import avatar7 from '../../assets/img/avatars/avatar7.png';
import avatar8 from '../../assets/img/avatars/avatar8.png';
import avatar9 from '../../assets/img/avatars/avatar9.png';
import avatar10 from '../../assets/img/avatars/avatar10.png';
import { Avatar, Button, Modal } from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import { useState, useContext } from 'react';
import UserContext from '../../context/user/userContext';

export const SelectAvatar = ({
  imageChangeHandler,
  profileImage,
  setProfileImage,
  edit,
  currentAvatar,
}) => {
  const { user, setNewAvatar } = useContext(UserContext);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const userAvatars = [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6,
    avatar7,
    avatar8,
    avatar9,
    avatar10,
  ];

  const showModalHandler = () => {
    setIsModalVisible(true);
  };

  const modalOkHandler = () => {
    setIsModalVisible(false);

    if (edit) {
      setNewAvatar(profileImage, user?.id);
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
    <Button onClick={showModalHandler} type='primary'>
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
