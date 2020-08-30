import React, {useState} from 'react'

const BlogDetails = ({blog}) => (
  <>
  <div>{blog.url}</div>
  <div>{blog.likes} <button>like</button></div>
  <div>{blog.user.username}</div>
  </>
);

const Blog = ({ blog }) => {
  const [expanded, setExpanded] = useState(false);

	const toggleExpansion = () => {
		setExpanded(!expanded);
	}

  const blogStyle = {
    border: '2px solid black',
    margin: '0.5em',
    padding: '0.5em'
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleExpansion}>{expanded ? 'hide' : 'view'}</button>
      {expanded && <BlogDetails blog={blog} />}
    </div>
  );
};

export default Blog
