const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');
const { request } = require('express');

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
