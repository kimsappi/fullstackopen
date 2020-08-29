import axios from 'axios'
import getAuthHeader from './authHeader';

const baseUrl = '/api/blogs'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data;
}

const submitNew = async (title, author, url, user) => {
	const response = await axios.post(baseUrl,
		{title: title, author: author, url: url},
		{headers: getAuthHeader(user)}
	);
	return {status: response.status, data: response.data};
}

export {
	getAll,
	submitNew
}
