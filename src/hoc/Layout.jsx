import { Navbar } from '../components/index';
import { Outlet } from 'react-router-dom';

export const WithoutNav = () => <Outlet />;

export const WithNav = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);
