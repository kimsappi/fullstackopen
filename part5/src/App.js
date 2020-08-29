import React, { useState, useEffect } from 'react'

import * as blogservice from './services/blogs';

import Login from './components/Login';
import Blog from './components/Blog';
import NewBlogInput from './components/NewBlogInput';

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [rerenderBlogs, setRerenderBlogs] = useState(false);

	useEffect(() => {
		blogservice.getAll().then(blogs =>
			setBlogs(blogs)
		)
	}, [rerenderBlogs])

	useEffect(() => {
		const userData = localStorage.getItem('user');
		if (userData)
			setUser(JSON.parse(userData));
	}, []);

	if (user)
		return (
			<div>
				<h2>blogs</h2>
				<p>{user.username} logged in <button onClick={() => {setUser(null); localStorage.clear();}}>logout</button></p>
				<NewBlogInput user={user} rerenderBlogs={rerenderBlogs} setRerenderBlogs={setRerenderBlogs} />
				{blogs.map(blog =>
					<Blog key={blog.id} blog={blog} />
				)}
			</div>
		);

	else 
		return (
			<Login user={user} setUser={setUser} />
		);
}

export default App
