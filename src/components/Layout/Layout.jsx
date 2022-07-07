import { Outlet } from 'react-router-dom';
import { Navbar } from '../index';
import { Announcements } from '../index';

export const WithoutNav = () => <Outlet />;

export const WithNav = () => (
  <>
    <Announcements isNotification={true} />
    <Navbar />
    <Outlet />
  </>
);
