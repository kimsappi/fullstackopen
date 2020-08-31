import React, { useState } from 'react';
import { deleteBlog } from '../services/blogs';

const BlogDetails = ({ blog, user, rerenderBlogs, setRerenderBlogs, submitLike }) => {
  const checkDeletion = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
      deleteBlog(blog.id, user, rerenderBlogs, setRerenderBlogs);
  };

  return(
    <div className='blogDetails'>
      <div>{blog.url}</div>
      <div>{blog.likes} <button className='likeButton' onClick={() => submitLike(blog, user, rerenderBlogs, setRerenderBlogs)}>like</button></div>
      <div>{blog.user.name}</div>
      {user.id === blog.user.id && <button onClick={checkDeletion}>remove</button>}
    </div>
  );
};

const Blog = ({ blog, user, rerenderBlogs, setRerenderBlogs, submitLike }) => {
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
      <div className='blogSummary'>
        {blog.title} {blog.author} <button className='blogExpansionButton' onClick={toggleExpansion}>{expanded ? 'hide' : 'view'}</button>
      </div>
      {expanded && <BlogDetails blog={blog} user={user} rerenderBlogs={rerenderBlogs} setRerenderBlogs={setRerenderBlogs} submitLike={submitLike} />}
    </div>
  );
};

export default Blog;
