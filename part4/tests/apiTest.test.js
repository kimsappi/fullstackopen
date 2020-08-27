const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app');
const Blog = require('../models/Blog');
const testHelper = require('./testHelper');

const api = supertest(app);

test('Correct number of notes returned as JSON', async () => {
	const response = await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/);
		
	expect(response.body).toHaveLength(testHelper.initBlogs.length);
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
