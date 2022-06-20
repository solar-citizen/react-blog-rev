import './App.css';
import 'antd/dist/antd.css';
import { useContext, useEffect } from 'react';
import PostsContext from './context/posts/postsContext';
import { Routes, Route, Navigate } from 'react-router-dom';
import BlogList from './pages/BlogList/BlogList';
import Post from './pages/Post/Post';
import Profile from './pages/Profile/Profile';
import CreatePost from './pages/CreatePost/CreatePost';
import SignIn from './pages/Auth/SignIn/SignIn';
import SignUp from './pages/Auth/SignUp/SignUp';
import WithNav from './hoc/Layout/WithNav';
import WithoutNav from './hoc/Layout/WithoutNav';
import { Announcements } from './components/index';
import UserContext from './context/user/userContext';
import AnnouncementsContext from './context/announcements/announcementsContext';

const App = () => {
  const { user, autoLogin } = useContext(UserContext);
  const { getAnnouncements } = useContext(AnnouncementsContext);
  const { getPosts } = useContext(PostsContext);

  useEffect(() => {
    autoLogin();
    getAnnouncements();
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let routes = (
    <Routes>
      <Route element={<WithoutNav />}>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Route>

      <Route element={<WithNav />}>
        <Route path='/blog' element={<BlogList />} />
        <Route path='/blog/post/:id' element={<Post />} />
        <Route path='/' element={<BlogList />} />
      </Route>
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );

  if (user) {
    routes = (
      <Routes>
        <Route element={<WithNav />}>
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/blog/post/:id' element={<Post />} />
          <Route path='/profile/:name' element={<Profile />} />
          <Route path='/' element={<BlogList />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Route>
      </Routes>
    );
  }

  return (
    <div className='App'>
      <Announcements isNotification={true} />
      <div className='container'>{routes}</div>
    </div>
  );
};

export default App;
