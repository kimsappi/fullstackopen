import React, { useState } from 'react';
import PropTypes from 'prop-types';

import InputWithLabel from './InputWithLabel';
import { submitNew } from '../services/blogs';

const NewBlogInput = ({ user, rerenderBlogs, setRerenderBlogs, setNotification, toggleRef }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addNewBlog = async event => {
    event.preventDefault();
    const response = await submitNew(title, author, url, user);
    if (response.status === 201) {
      setRerenderBlogs(!rerenderBlogs);
      setNotification('blogSuccess');
      toggleRef.current.toggleVisibility();
    }
    else
      setNotification('blogError');
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={event => addNewBlog(event)}>
        <InputWithLabel type='text' name='title' label='title:' state={title} setState={setTitle} />
        <InputWithLabel type='text' name='author' label='author:' state={author} setState={setAuthor} />
        <InputWithLabel type='text' name='url' label='url:' state={url} setState={setUrl} />
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
