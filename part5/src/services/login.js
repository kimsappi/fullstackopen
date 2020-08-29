import axios from 'axios'
const baseUrl = '/api/login'

const submitLogin = async (username, password) => {
	const response = await axios.post(baseUrl, {username: username, password: password});
	return {status: response.status, data: response.data};
};

export {
	submitLogin
};
