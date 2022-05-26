import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { PostsState } from './context/posts/postsState';
import { UserState } from './context/user/userState';
import { AnnouncementsState } from './context/announcements/announcementsState';
import { LoadingState } from './context/loading/loadingState';

ReactDOM.render(
  <BrowserRouter>
    <UserState>
      <LoadingState>
        <AnnouncementsState>
          <PostsState>
            <App />
          </PostsState>
        </AnnouncementsState>
      </LoadingState>
    </UserState>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
