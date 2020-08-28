const mongoose = require('mongoose')
const supertest = require('supertest')
const _ = require('lodash');

const app = require('../app');
const Blog = require('../models/Blog');
const testHelper = require('./testHelper');

const api = supertest(app);

describe('Testing blogs with initial blogs in the DB', () => {
	let token = '';

	test('Posting a blog without logging in', async () => {
		const startingBlogs = await testHelper.getBlogs();
		const newBlog = {author: 'me', title: 'Sent in API test', url: 'http://localhost', likes: 42};
	
		const response = await api
			.post('/api/blogs')
			.send(newBlog)
			.set({Authorization: 'bearer ' + ''})
			.expect(401)
			.expect('Content-Type', /application\/json/);
	
		const newBlogs = await testHelper.getBlogs();
	
		expect(newBlogs).toHaveLength(startingBlogs.length);
		const newBlogsWithoutMongoData = newBlogs.map(blog => _.omit(blog, ['id', '__v', '_id', 'user']));
		expect(newBlogsWithoutMongoData).not.toContainEqual(newBlog);
	});

	test('Correct number of notes returned as JSON', async () => {
		const startingBlogs = await testHelper.getBlogs();
		const response = await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/);
			
		expect(response.body).toHaveLength(startingBlogs.length);
	});

	test('There is a field named id', async () => {
		const response = await api.get('/api/blogs');
		expect(response.body[0]).toBeDefined();
		expect(response.body[0]['_id']).toBeUndefined();
	});

	describe('Creating a new blog', () => {
		test('Adding a blog with complete data', async () => {
			const startingBlogs = await testHelper.getBlogs();
			const newBlog = {author: 'me', title: 'Sent in API test', url: 'http://localhost', likes: 42};

			const response = await api
				.post('/api/blogs')
				.set({Authorization: 'bearer ' + token})
				.send(newBlog)
				.expect(201)
				.expect('Content-Type', /application\/json/);

			const newBlogs = await testHelper.getBlogs();

			expect(newBlogs).toHaveLength(startingBlogs.length + 1);
			const newBlogsWithoutMongoData = newBlogs.map(blog => _.omit(blog, ['id', '__v', '_id', 'user']));
			expect(newBlogsWithoutMongoData).toContainEqual(newBlog);
		});

		test('Adding a blog with missing likes', async () => {
			const startingBlogs = await testHelper.getBlogs();
			const newBlog = {author: 'me', title: 'Sent in API test', url: 'http://localhost'};

			const response = await api
				.post('/api/blogs')
				.set({Authorization: 'bearer ' + token})
				.send(newBlog)
				.expect(201)
				.expect('Content-Type', /application\/json/);

			const newBlogs = await testHelper.getBlogs();

			expect(newBlogs).toHaveLength(startingBlogs.length + 1);
			const newBlogsWithoutMongoData = newBlogs.map(blog => _.omit(blog, ['id', '__v', '_id', 'user']));
			expect(newBlogsWithoutMongoData).toContainEqual({...newBlog, likes: 0});
		});

		test('Adding a blog with missing title and url', async () => {
			const newBlog = {author: 'me', likes: 5};
			const response = await api
				.post('/api/blogs')
				.set({Authorization: 'bearer ' + token})
				.send(newBlog)
				.expect(400)
				.expect('Content-Type', /application\/json/);
		});
	});

	test('Updating a blog', async () => {
		const blogsAtBeginning = await testHelper.getBlogs();
		const updatedBlog = blogsAtBeginning[0];
		const updatedData = {author: 'TestAuthor', likes: 997};
		const response = await api
			.patch(`/api/blogs/${updatedBlog.id}`)
			.send(updatedData)
			.expect(200)
			.expect('Content-Type', /application\/json/);

		const newBlogs = await testHelper.getBlogs();

		expect(newBlogs).toHaveLength(blogsAtBeginning.length);
		const newBlogsWithoutMongoData = newBlogs.map(blog => _.omit(blog, ['id', '__v', '_id']));
		expect(newBlogsWithoutMongoData).not.toContainEqual(updatedBlog);
		expect(newBlogsWithoutMongoData).toContainEqual(_.omit(
			{...updatedBlog, ...updatedData},
			['id', '__v', '_id']
		));
	});

	beforeAll(async () => {
		const newUser = {username: 'dummy', password: '123', name: 'testUser'};

		const loginRes = await api
			.post('/api/login')
			.send(_.omit(newUser, 'name'))
			.expect(200)
			.expect('Content-Type', /application\/json/);

		token = loginRes.body.token;
	});

	beforeEach(async () => {
		// Clean database
		await Blog.deleteMany({});

		// Initialise database with the same blogs every time
		const blogs = testHelper.initBlogs.map(blog => new Blog(blog));
		const savePromises = blogs.map(blog => blog.save());
		await Promise.all(savePromises);

		jest.useFakeTimers();
	});

	afterAll(() => mongoose.connection.close());
});
