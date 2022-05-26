import styles from './Tabs.module.css';
import Tab from '../Tab/Tab';
import MyProfile from '../../components/Profile/MyProfile/MyProfile';
import MyPosts from '../../components/Profile/MyPosts/MyPosts';
import MyAnnouncements from '../Profile/MyAnnouncements/MyAnnouncements';

const Tabs = () => {
  const tabContent = [
    {
      title: 'My profile',
      content: <MyProfile />,
    },
    {
      title: 'My posts',
      content: <MyPosts />,
    },
    {
      title: 'My announcements',
      content: <MyAnnouncements />,
    },
  ];

  return (
    <div className={styles.Tabs}>
      <Tab active={0}>
        {tabContent.map((tab, i) => (
          <Tab.TabPane key={`Tab-${i}`} tab={tab.title}>
            {tab.content}
          </Tab.TabPane>
        ))}
      </Tab>
    </div>
  );
};

export default Tabs;
