const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/User');

const checkUserData = item => {
	if (typeof item === 'undefined' || item.length < 3)
		return false;
	return true;
};

usersRouter.get('/', async (request, response) => {
	const users = await User
		.find({})
		.select('-password')
		.populate('blogs', {url: 1, title: 1, author: 1, id: 1});
	response.json(users);
});

usersRouter.post('/', async (request, response) => {
	if (!checkUserData(request.body.username) || !checkUserData(request.body.password))
		return response.status(400).json('Username or password missing');

	const user = new User({...request.body, password: await bcrypt.hash(request.body.password, 10)});

	try {
		const result = await user.save();
		response.status(201).json(result);
	}
	catch (ValidationError) {
		return response.status(400).json('Username must be unique');
	}
});

module.exports = usersRouter;
