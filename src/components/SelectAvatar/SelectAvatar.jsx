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
import { UserOutlined } from '@ant-design/icons';
import { useState } from 'react';

const SelectAvatar = ({ imageChangeHandler, profileImage }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const imagesArray = [
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
  };

  const cancelHandler = () => {
    setIsModalVisible(false);
  };

  return (
    <div className={styles.SelectAvatar}>
      <Avatar size={64} icon={<UserOutlined />} src={profileImage} />
      <Button onClick={showModalHandler} type='primary'>
        Select Avatar
      </Button>
      <Modal
        title='Pick An Avatar:'
        visible={isModalVisible}
        centered
        onOk={modalOkHandler}
        onCancel={cancelHandler}
      >
        {imagesArray.map((src, i) => (
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