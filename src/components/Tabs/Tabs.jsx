import styles from './Tabs.module.css';
import { Tab, UserProfile, UserPosts, UserAnnouncements } from '../index';

const Tabs = () => {
  const tabContent = [
    {
      title: 'My profile',
      content: <UserProfile />,
    },
    {
      title: 'My posts',
      content: <UserPosts />,
    },
    {
      title: 'My announcements',
      content: <UserAnnouncements />,
    },
  ];

  return (
    <div className={styles.Tabs}>
      <Tab active={0}>
        {tabContent.map((tab, i) => (
          <Tab.TabPane key={`Tab-${i}`} tab={tab?.title}>
            {tab?.content}
          </Tab.TabPane>
        ))}
      </Tab>
    </div>
  );
};

export default Tabs;
