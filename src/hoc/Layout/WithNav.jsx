import { Navbar } from '../../components/index';
import { Outlet } from 'react-router-dom';

export const WithNav = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);
