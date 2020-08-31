import React, { useState } from 'react';
import { submitLike, deleteBlog } from '../services/blogs';

const BlogDetails = ({ blog, user, rerenderBlogs, setRerenderBlogs }) => {
  const checkDeletion = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
      deleteBlog(blog.id, user, rerenderBlogs, setRerenderBlogs);
  };

  return(
    <div class='blogDetails'>
      <div>{blog.url}</div>
      <div>{blog.likes} <button onClick={() => submitLike(blog, user, rerenderBlogs, setRerenderBlogs)}>like</button></div>
      <div>{blog.user.name}</div>
      {user.id === blog.user.id && <button onClick={checkDeletion}>remove</button>}
    </div>
  );
};

const Blog = ({ blog, user, rerenderBlogs, setRerenderBlogs }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  const blogStyle = {
    border: '2px solid black',
    margin: '0.5em',
    padding: '0.5em'
  };

  return (
    <div style={blogStyle}>
      <div class='blogSummary'>
        {blog.title} {blog.author} <button onClick={toggleExpansion}>{expanded ? 'hide' : 'view'}</button>
      </div>
      {expanded && <BlogDetails blog={blog} user={user} rerenderBlogs={rerenderBlogs} setRerenderBlogs={setRerenderBlogs} />}
    </div>
  );
};

export default Blog;
