import React from 'react';
import '@testing-library/jest-dom/dist/extend-expect';
import { render } from '@testing-library/react';
import Blog from './Blog';

test('renders content', () => {
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

  const component = render(
    <Blog blog={blog} user={user} rerenderBlogs={false} setRerenderBlogs={mockFunction} />
  );

  expect(component.container.querySelector('.blogSummary')).toBeDefined();
  expect(component.container.querySelector('.blogDetails')).toBe(null);
});
