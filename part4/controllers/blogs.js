const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({});
	response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
	// Technically the subject wanted missing title AND URL, but...
	if (typeof request.body.title === 'undefined' ||
			typeof request.body.url === 'undefined')
		return response.status(400).json(null);

	if (typeof request.body.likes === 'undefined')
		request.body.likes = 0
	const blog = new Blog(request.body);

	const result = await blog.save();
	response.status(201).json(result);
})

module.exports = blogsRouter;
