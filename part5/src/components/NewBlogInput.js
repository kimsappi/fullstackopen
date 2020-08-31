import React, { useState } from 'react';
import PropTypes from 'prop-types';

import InputWithLabel from './InputWithLabel';

const NewBlogInput = ({ user, rerenderBlogs, setRerenderBlogs, setNotification, toggleRef, addNewBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={event => addNewBlog(event, title, author, url, user, setRerenderBlogs, setNotification, rerenderBlogs, toggleRef)}>
        <InputWithLabel id='title' type='text' name='title' label='title:' state={title} setState={setTitle} />
        <InputWithLabel id='author' type='text' name='author' label='author:' state={author} setState={setAuthor} />
        <InputWithLabel id='url' type='text' name='url' label='url:' state={url} setState={setUrl} />
        <input type='submit' name='submit' value='create' />
      </form>
    </>
  );
};

NewBlogInput.propTypes = {
  user: PropTypes.object.isRequired,
  rerenderBlogs: PropTypes.bool.isRequired,
  setRerenderBlogs: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
  toggleRef: PropTypes.object.isRequired
};

export default NewBlogInput;
