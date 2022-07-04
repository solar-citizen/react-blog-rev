import './App.css';
import 'antd/dist/antd.css';
import { useContext, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Announcements } from './components/index';
import {
  BlogList,
  Post,
  Profile,
  CreatePost,
  SignIn,
  SignUp,
} from './pages/index';
import { WithoutNav, WithNav } from './components/Layout/Layout';
import UserContext from './context/user/userContext';
import PostsContext from './context/posts/postsContext';
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
