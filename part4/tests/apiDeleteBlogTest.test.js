const mongoose = require('mongoose')
const supertest = require('supertest')
const _ = require('lodash');

const app = require('../app');
const Blog = require('../models/Blog');
const testHelper = require('./testHelper');

const api = supertest(app);

describe('Deleting a blog', () => {
	let newBlogId = '';
	let token = '';

	test('Not logged in', async () => {
		const blogsAtBeginning = await testHelper.getBlogs();
		const response = await api
			.delete(`/api/blogs/${newBlogId}`)
			.set({Authorization: 'bearer ' + ''})
			.expect(401)
			.expect('Content-Type', /application\/json/);

		const newBlogs = await testHelper.getBlogs();

		expect(newBlogs).toHaveLength(blogsAtBeginning.length);
	});

	test('Logged in', async () => {
		const blogsAtBeginning = await testHelper.getBlogs();
		const response = await api
			.delete(`/api/blogs/${newBlogId}`)
			.set({Authorization: 'bearer ' + token})
			.expect(200)
			.expect('Content-Type', /application\/json/);

		const newBlogs = await testHelper.getBlogs();

		expect(newBlogs).toHaveLength(blogsAtBeginning.length - 1);
	});

	beforeAll(async () => {
		const newUser = {username: 'dummy', password: '123', name: 'testUser'};

		const loginRes = await api
			.post('/api/login')
			.send(_.omit(newUser, 'name'))
			.expect(200)
			.expect('Content-Type', /application\/json/);

		token = loginRes.body.token;

		const newBlog = {author: 'me', title: 'Sent in deletion test', url: 'http://localhost', likes: 42};
		const response = await api
			.post('/api/blogs')
			.set({Authorization: 'bearer ' + token})
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/);
		newBlogId = response.body.id;
	});

	afterAll(() => mongoose.connection.close());
});
