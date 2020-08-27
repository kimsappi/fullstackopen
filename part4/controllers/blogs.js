const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', {name: 1, username: 1, id: 1});
	response.status(200).json(blogs);
});

const getUser = async () => {
	const user = await User.findOne({});
	return user;
};

blogsRouter.post('/', async (request, response) => {
	// Technically the subject wanted missing title AND URL, but...
	if (typeof request.body.title === 'undefined' ||
			typeof request.body.url === 'undefined')
		return response.status(400).json(null);

	if (typeof request.body.likes === 'undefined')
		request.body.likes = 0

	// Getting random user (for now)
	const user = await getUser();

	const blog = new Blog({
		title: request.body.title,
		url: request.body.url,
		author: request.body.author,
		likes: request.body.likes,
		user: user['_id']
	});
	const result = await blog.save();
	
	// Associating new blog with user
	user.blogs = user.blogs.concat(result['_id']);
	const userResult = await user.save();
	
	response.status(201).json(result);
});

blogsRouter.delete('/:id', async (request, response) => {
	const result = await Blog.findByIdAndDelete(request.params.id);
	response.status(200).json(result);
});

blogsRouter.patch('/:id', async (request, response) => {
	if (!request.body)
		response.status(400).json('error');

	const result = await Blog.findByIdAndUpdate(request.params.id, request.body);
	response.status(200).json(result);
});

module.exports = blogsRouter;
