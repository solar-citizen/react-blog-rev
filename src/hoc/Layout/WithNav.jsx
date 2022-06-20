import { Navbar } from '../../components/index';
import { Outlet } from 'react-router-dom';

const WithNav = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

export default WithNav;
