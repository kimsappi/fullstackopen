import axios from 'axios'
import getAuthHeader from './authHeader';

const baseUrl = '/api/blogs'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data;
}

const submitNew = async (title, author, url, user) => {
	try {
		const response = await axios.post(baseUrl,
			{title: title, author: author, url: url},
			{headers: getAuthHeader(user)}
		);
		return {status: response.status, data: response.data};
	} catch(err) {
		return {status: 400};
	}
}

const deleteBlog = async (id, user, rerenderBlogs, setRerenderBlogs) => {
	try {
		const response = await axios.delete(baseUrl + '/' + id, {headers: getAuthHeader(user)});

		if (response.status === 200)
			setRerenderBlogs(!rerenderBlogs);
	} catch(err) {
		console.error(err);
	}
};

const submitLike = async (blog, user, rerenderBlogs, setRerenderBlogs) => {
	try {
		const response = await axios.put(baseUrl + '/' + blog.id,
			{
				user: blog.user.id,
				likes: blog.likes + 1,
				author: blog.author,
				title: blog.title,
				url: blog.url
			},
			{headers: getAuthHeader(user)});
		if (response.status === 200)
			setRerenderBlogs(!rerenderBlogs);
		return {status: response.status, data: response.data};
	} catch(err) {
		return {status: 400};
	}
};

export {
	getAll,
	submitNew,
	submitLike,
	deleteBlog
}
