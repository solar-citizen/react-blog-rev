import Navbar from '../../components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';

const WithNav = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

export default WithNav;
