const mongoose = require('mongoose')
const supertest = require('supertest')
const _ = require('lodash');

const app = require('../app');
const User = require('../models/User');
const testHelper = require('./testHelper');
const Blog = require('../models/Blog');

const api = supertest(app);

describe('Testing user functions', () => {
	test('Correct number of users returned as JSON', async () => {
		const response = await api
			.get('/api/users')
			.expect(200)
			.expect('Content-Type', /application\/json/);
			
		expect(response.body).toHaveLength(testHelper.initUsers.length);
	});

	// test('There is a field named id', async () => {
	// 	const response = await api.get('/api/users');
	// 	expect(response.body[0]).toBeDefined();
	// 	expect(response.body[0]['_id']).toBeUndefined();
	// });

	describe('User creation', () => {
		test('Adding a user with complete data', async () => {
			const newUser = {username: 'dummy', password: '123', name: 'testUser'};
			const response = await api
				.post('/api/users')
				.send(newUser)
				.expect(201)
				.expect('Content-Type', /application\/json/);

			const newUsers = await testHelper.getUsers();

			expect(newUsers).toHaveLength(testHelper.initUsers.length + 1);
			const newUsersWithoutMongoData = newUsers.map(user => _.omit(user, ['id', '__v', '_id', 'password', 'blogs']));
			delete newUser.password;
			expect(newUsersWithoutMongoData).toContainEqual(newUser);
		});

		test('Adding a user with missing password', async () => {
			const newUser = {username: 'dummy', name: 'testUser'};
			const response = await api
				.post('/api/users')
				.send(newUser)
				.expect(400)
				.expect('Content-Type', /application\/json/);

			const newUsers = await testHelper.getUsers();

			expect(newUsers).toHaveLength(testHelper.initUsers.length);
			const newUsersWithoutMongoData = newUsers.map(user => _.omit(user, ['id', '__v', '_id', 'password', 'blogs']));
			delete newUser.password;
			expect(newUsersWithoutMongoData).not.toContainEqual(newUser);
		});

		test('Adding a user with an existing name', async () => {
			const newUser = testHelper.initUsers[0];
			const response = await api
				.post('/api/users')
				.send(newUser)
				.expect(400)
				.expect('Content-Type', /application\/json/);
		});
	});

	describe('Creating a user and logging in', () => {
		const newUser = {username: 'dummy', password: '123', name: 'testUser'};

		test('Login with valid user', async () => {
			const loginRes = await api
				.post('/api/login')
				.send(_.omit(newUser, 'name'))
				.expect(200)
				.expect('Content-Type', /application\/json/);
		});

		test('Login with nonexistent user', async () => {
			const loginRes = await api
				.post('/api/login')
				.send({username: '34rtr45yght5rh5', password: '123'})
				.expect(401)
				.expect('Content-Type', /application\/json/);
		});

		test('Login with real user, wrong password', async () => {
			const loginRes = await api
				.post('/api/login')
				.send({username: newUser.username, password: '1234325546aads'})
				.expect(401)
				.expect('Content-Type', /application\/json/);
		});

		beforeEach(async  () => {
			await api
				.post('/api/users')
				.send(newUser)
				.expect(201)
				.expect('Content-Type', /application\/json/);
		});
	});

	// test('Deleting a user', async () => {
	// 	const usersAtBeginning = await testHelper.getusers();
	// 	const userToBeDeleted = usersAtBeginning[0];
	// 	const response = await api
	// 		.delete(`/api/users/${userToBeDeleted.id}`)
	// 		.expect(200)
	// 		.expect('Content-Type', /application\/json/);

	// 	const newUsers = await testHelper.getusers();

	// 	expect(newUsers).toHaveLength(usersAtBeginning.length - 1);
	// 	const newUsersWithoutMongoData = newUsers.map(user => _.omit(user, ['id', '__v', '_id']));
	// 	expect(newUsersWithoutMongoData).not.toContainEqual(userToBeDeleted);
	// });

	// test('Updating a user', async () => {
	// 	const usersAtBeginning = await testHelper.getusers();
	// 	const updateduser = usersAtBeginning[0];
	// 	const updatedData = {author: 'TestAuthor', likes: 997};
	// 	const response = await api
	// 		.patch(`/api/users/${updateduser.id}`)
	// 		.send(updatedData)
	// 		.expect(200)
	// 		.expect('Content-Type', /application\/json/);

	// 	const newUsers = await testHelper.getusers();

	// 	expect(newUsers).toHaveLength(usersAtBeginning.length);
	// 	const newUsersWithoutMongoData = newUsers.map(user => _.omit(user, ['id', '__v', '_id']));
	// 	expect(newUsersWithoutMongoData).not.toContainEqual(updateduser);
	// 	expect(newUsersWithoutMongoData).toContainEqual(_.omit(
	// 		{...updateduser, ...updatedData},
	// 		['id', '__v', '_id']
	// 	));
	// });

	beforeEach(async () => {
		// Clean database
		await User.deleteMany({});
		await Blog.deleteMany({});

		// Initialise database with the same users every time
		const users = testHelper.initUsers.map(user => new User(user));
		const savePromises = users.map(user => user.save());
		const blogs = testHelper.initBlogs.map(blog => new Blog(blog));
		const saveBlogs = blogs.map(blog => blog.save());
		await Promise.all([...savePromises, ...saveBlogs]);
	});

	afterAll(() => mongoose.connection.close());
});
