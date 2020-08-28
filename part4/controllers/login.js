const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const jwt = require('jsonwebtoken');

const config = require('../utils/config');
const User = require('../models/User');

const checkUserData = item => {
	if (typeof item === 'undefined' || item.length < 3)
		return false;
	return true;
};

loginRouter.post('/', async (request, response) => {
	if (!checkUserData(request.body.username) || !checkUserData(request.body.password))
		return response.status(400).json('Username or password missing');

	const user = await User.findOne({username: request.body.username});
	const loginSuccess = !user ? false : await bcrypt.compare(request.body.password, user.password);

	if (!loginSuccess)
		return response.status(401).json('Username or password wrong');
	else {
		const userData = {username: user.username, id: user._id};
		const token = jwt.sign(userData, config.TOKEN_SECRET);
		return response.status(200).json({token: token, username: userData.username, id: userData.id});
	}
});

module.exports = loginRouter;
