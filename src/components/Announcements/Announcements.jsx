import styles from './Announcements.module.css';
import { useContext } from 'react';
import { Announcement } from '../index';
import UserContext from '../../context/user/userContext';
import AnnouncementsContext from '../../context/announcements/announcementsContext';
import { useWatchWindowWidth } from '../../hooks/useWatchWindowWidth';

const Announcements = ({ isNotification }) => {
  const { user } = useContext(UserContext);
  const { announcements } = useContext(AnnouncementsContext);
  const { width } = useWatchWindowWidth();

  const renderAnnouncements = () => {
    if (width <= 850) {
      return;
    }

    if (announcements?.length) {
      // for logged user (won't see announcement made by himself)
      if (user) {
        const filteredAnnouncements = announcements.filter(
          (announcement) => announcement?.userId !== user?.id
        );

        if (isNotification) {
          return filteredAnnouncements.map((filteredAnnouncement) => (
            <Announcement
              isNotification={isNotification}
              announcement={filteredAnnouncement}
              key={filteredAnnouncement?.id}
            />
          ));
        }
      }

      // for not logged users
      if (isNotification) {
        return announcements.map((announcementItem) => (
          <Announcement
            isNotification={isNotification}
            announcement={announcementItem}
            key={announcementItem?.id}
          />
        ));
      }
    }
  };

  return <div className={styles.Announcements}>{renderAnnouncements()}</div>;
};

export default Announcements;
