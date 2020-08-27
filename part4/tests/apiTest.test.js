const mongoose = require('mongoose')
const supertest = require('supertest')
const _ = require('lodash');

const app = require('../app');
const Blog = require('../models/Blog');
const testHelper = require('./testHelper');

const api = supertest(app);

describe('Testing blogs with initial blogs in the DB', () => {
	test('Correct number of notes returned as JSON', async () => {
		const response = await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/);
			
		expect(response.body).toHaveLength(testHelper.initBlogs.length);
	});

	test('There is a field named id', async () => {
		const response = await api.get('/api/blogs');
		expect(response.body[0]).toBeDefined();
		expect(response.body[0]['_id']).toBeUndefined();
	});

	describe('Creating a new blog', () => {
		test('Adding a blog with complete data', async () => {
			const newBlog = {author: 'me', title: 'Sent in API test', url: 'http://localhost', likes: 42};
			const response = await api
				.post('/api/blogs')
				.send(newBlog)
				.expect(201)
				.expect('Content-Type', /application\/json/);

			const newBlogs = await testHelper.getBlogs();

			expect(newBlogs).toHaveLength(testHelper.initBlogs.length + 1);
			const newBlogsWithoutMongoData = newBlogs.map(blog => _.omit(blog, ['id', '__v', '_id']));
			expect(newBlogsWithoutMongoData).toContainEqual(newBlog);
		});

		test('Adding a blog with missing likes', async () => {
			const newBlog = {author: 'me', title: 'Sent in API test', url: 'http://localhost'};
			const response = await api
				.post('/api/blogs')
				.send(newBlog)
				.expect(201)
				.expect('Content-Type', /application\/json/);

			const newBlogs = await testHelper.getBlogs();

			expect(newBlogs).toHaveLength(testHelper.initBlogs.length + 1);
			const newBlogsWithoutMongoData = newBlogs.map(blog => _.omit(blog, ['id', '__v', '_id']));
			expect(newBlogsWithoutMongoData).toContainEqual({...newBlog, likes: 0});
		});

		test('Adding a blog with missing title and url', async () => {
			const newBlog = {author: 'me', likes: 5};
			const response = await api
				.post('/api/blogs')
				.send(newBlog)
				.expect(400)
				.expect('Content-Type', /application\/json/);
		});
	});

	beforeEach(async () => {
		// Clean database
		await Blog.deleteMany({});

		// Initialise database with the same blogs every time
		const blogs = testHelper.initBlogs.map(blog => new Blog(blog));
		const savePromises = blogs.map(blog => blog.save());
		await Promise.all(savePromises);
	});

	afterAll(() => mongoose.connection.close());
});
