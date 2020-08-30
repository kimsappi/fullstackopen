import React, { useState, useEffect, useRef } from 'react';

import * as blogservice from './services/blogs';

import Login from './components/Login';
import Blog from './components/Blog';
import NewBlogInput from './components/NewBlogInput';
import Togglable from './components/Togglable';
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [rerenderBlogs, setRerenderBlogs] = useState(false);
  const [notification, setNotification] = useState(null);

  const createFormRef = useRef();

  useEffect(() => {
    blogservice.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(blogs);
    });
  }, [rerenderBlogs]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData)
      setUser(JSON.parse(userData));
  }, []);

  if (user)
    return (
      <div>
        <h2>blogs</h2>
        <Notification notification={notification} setNotification={setNotification} />
        <p>{user.username} logged in <button onClick={() => {setUser(null); localStorage.clear();}}>logout</button></p>
        <Togglable ref={createFormRef} buttonLabel='new blog'>
          <NewBlogInput user={user}
            rerenderBlogs={rerenderBlogs} setRerenderBlogs={setRerenderBlogs}
            notification={notification} setNotification={setNotification}
            toggleRef={createFormRef}
          />
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user}
            rerenderBlogs={rerenderBlogs} setRerenderBlogs={setRerenderBlogs}
          />
        )}
      </div>
    );

  else
    return (
      <>
        <Notification notification={notification} setNotification={setNotification} />
        <Login user={user} setUser={setUser}
          notification={notification} setNotification={setNotification}
        />
      </>
    );
};

export default App;
