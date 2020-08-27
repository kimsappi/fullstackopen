const _ = require('lodash');

const dummy = blogs => {
	return 1;
};

const totalLikes = blogs => {
	return blogs.reduce((count, blog) => count + blog.likes, 0);	
};

const favoriteBlog = blogs => {
	const reducer = (favorite, current) => {
		return current.likes >= favorite.likes ? current : favorite;
	};

	const favorite = blogs.reduce(reducer, {likes: null});

	if (favorite.likes === null)
		return null;
	else
		return {
			title: favorite.title,
			author: favorite.author,
			likes: favorite.likes
		};
};

const mostBlogs = blogs => {
	if (!blogs.length)
		return null;
	const authorAndCount = _.countBy(blogs, 'author');
	const maxCount = _.max(_.values(authorAndCount));
	return {
		author: _.findKey(authorAndCount, value => value === maxCount),
		blogs: maxCount
	};
};

const mostLikes = blogs => {
	if (!blogs.length)
		return null;
	const maxLikesByAuthor = _(blogs)
		.groupBy('author')
		.map((blog, key) => ({
			author: key,
			likes: _.sumBy(blog, 'likes')
		}))
		.maxBy('likes');

	return maxLikesByAuthor
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
};
