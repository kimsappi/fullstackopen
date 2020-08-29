import React, { useState, useEffect } from 'react'

import blogService from './services/blogs'

import Login from './components/Login';
import Blog from './components/Blog'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs(blogs)
		)
	}, [])

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
