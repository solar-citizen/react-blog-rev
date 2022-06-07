import styles from './Navbar.module.css';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Button from '../UI/Button/Button';
import UserContext from '../../context/user/userContext';

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const loginHandler = (event) => {
    event.preventDefault();
    navigate('/sign-in');
  };

  const logoutHandler = (event) => {
    event.preventDefault();
    logout();
  };

  // buttons
  const loginBtn = (
    <Button type='login' onClick={loginHandler}>
      Login
    </Button>
  );
  const logoutBtn = (
    <Button type='logout' onClick={logoutHandler}>
      Logout
    </Button>
  );

  return (
    <nav className={styles.Navbar}>
      <ul>
        <li>
          <NavLink
            to='/'
            className={({ isActive }) => (isActive ? styles.active : null)}
          >
            Blog
          </NavLink>
        </li>

        {user ? (
          <li>
            <NavLink
              to={`/profile/${user?.firstname}_${user?.lastname}`}
              className={({ isActive }) => (isActive ? styles.active : null)}
            >
              {`${user?.firstname} ${user?.lastname}`}
            </NavLink>
          </li>
        ) : (
          ''
        )}

        <li>{user ? logoutBtn : loginBtn}</li>
      </ul>
    </nav>
  );
};

export default Navbar;
