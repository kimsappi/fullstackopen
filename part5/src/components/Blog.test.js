import React from 'react';
import '@testing-library/jest-dom/dist/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';
import NewBlogInput from './NewBlogInput';

const user = {
  id: '123',
  username: 'testUser',
  name: 'Test User'
};

const blog = {
  title: 'testTitle',
  author: 'testAuthor',
  url: 'testUrl',
  user: user,
  likes: 0
};

const mockFunction = jest.fn();
const likeMockFunction = jest.fn();

test('Only blog summary shown before blog is expanded', () => {
  const component = render(
    <Blog blog={blog} user={user} rerenderBlogs={false} setRerenderBlogs={mockFunction} submitLike={likeMockFunction} />
  );

  expect(component.container.querySelector('.blogSummary')).toBeDefined();
  expect(component.container.querySelector('.blogDetails')).toBe(null);
});

test('All info about blog shown when button is clicked', () => {
  const component = render(
    <Blog blog={blog} user={user} rerenderBlogs={false} setRerenderBlogs={mockFunction} submitLike={likeMockFunction} />
  );

  const expansionButton = component.container.querySelector('.blogExpansionButton');
  fireEvent.click(expansionButton);


  expect(component.container.querySelector('.blogSummary')).toBeDefined();
  expect(component.container.querySelector('.blogDetails')).toBeDefined();
});

test('Like function is called twice if button is clicked twice', () => {
  const component = render(
    <Blog blog={blog} user={user} rerenderBlogs={false} setRerenderBlogs={mockFunction} submitLike={likeMockFunction} />
  );

  const expansionButton = component.container.querySelector('.blogExpansionButton');
  fireEvent.click(expansionButton);
  expect(component.container.querySelector('.blogSummary')).toBeDefined();
  expect(component.container.querySelector('.blogDetails')).toBeDefined();

  const clickCount = 2;
  const likeButton = component.container.querySelector('.likeButton');
  for (let i = 0; i < clickCount; ++i)
    fireEvent.click(likeButton);
  expect(likeMockFunction.mock.calls).toHaveLength(clickCount);
});

test('New blog event handler receives the correct inputs', () => {
  const mockSubmit = jest.fn();
  const component = render(
    <NewBlogInput user={user} rerenderBlogs={false} setRerenderBlogs={mockFunction} setNotification={mockFunction} toggleRef={{}} addNewBlog={mockSubmit} />
  );

  const author = component.container.querySelector('#author');
  const title = component.container.querySelector('#title');
  const url = component.container.querySelector('#url');
  const form = component.container.querySelector('form');

  fireEvent.change(author, { target: { value: blog.author } });
  fireEvent.change(title, { target: { value: blog.title } });
  fireEvent.change(url, { target: { value: blog.url } });
  fireEvent.submit(form);

  expect(mockSubmit.mock.calls).toHaveLength(1);
  expect(mockSubmit.mock.calls[0][1]).toBe(blog.title);
  expect(mockSubmit.mock.calls[0][2]).toBe(blog.author);
  expect(mockSubmit.mock.calls[0][3]).toBe(blog.url);
});
