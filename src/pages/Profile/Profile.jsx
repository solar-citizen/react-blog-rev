import styles from './Profile.module.css';
import { Tabs } from '../../components/index';

const Profile = () => (
  <div className={styles.Profile}>
    <h1>Profile page</h1>
    <Tabs />
  </div>
);

export default Profile;
