import axios from 'axios'

const baseUrl = 'http://192.168.48.128:3001/persons';

const getNumbers = () => {
	const request = axios.get(baseUrl);
	return request.then(response => response.data);
}

const postNumber = numberObject => {
	const request = axios.post(baseUrl, numberObject)
	return request.then(response => response.data);
}

const deleteNumber = id => {
	const request = axios.delete(`${baseUrl}/${id}`);
	return request.then(response => response.data);
}

const updateNumber = (numberObject, id) => {
	const request = axios.put(`${baseUrl}/${id}`, numberObject);
	return request.then(response => response.data);
}

export default {getNumbers, postNumber, deleteNumber, updateNumber};