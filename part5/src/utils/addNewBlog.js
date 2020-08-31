import { submitNew } from '../services/blogs';

const addNewBlog = async (event, title, author, url, user, setRerenderBlogs, setNotification, rerenderBlogs, toggleRef) => {
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

export default addNewBlog;
