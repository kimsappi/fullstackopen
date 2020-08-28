const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', {name: 1, username: 1, id: 1});
	return response.status(200).json(blogs);
});

blogsRouter.post('/', async (request, response) => {
	if (!request.user)
		return response.status(401).json('Not logged in');

	// Technically the subject wanted missing title AND URL, but...
	if (typeof request.body.title === 'undefined' ||
			typeof request.body.url === 'undefined')
		return response.status(400).json(null);

	if (typeof request.body.likes === 'undefined')
		request.body.likes = 0

	// Getting random user (for now)
	const user = request.user;

	const blog = new Blog({
		title: request.body.title,
		url: request.body.url,
		author: request.body.author,
		likes: request.body.likes,
		user: user.id
	});
	const result = await blog.save();
	
	// Associating new blog with user
	user.blogs = user.blogs.concat(result['_id']);
	const userResult = await user.save();
	
	return response.status(201).json(result);
});

blogsRouter.delete('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id);
	if (!request.user || !blog || blog.user.toString() !== request.user.id.toString())
		return response.status(401).json('Not authorised to delete this blog');

	const result = await Blog.findByIdAndDelete(request.params.id);
	return response.status(200).json(result);
});

blogsRouter.patch('/:id', async (request, response) => {
	if (!request.body)
		return response.status(400).json('error');

	const result = await Blog.findByIdAndUpdate(request.params.id, request.body);
	return response.status(200).json(result);
});

module.exports = blogsRouter;
