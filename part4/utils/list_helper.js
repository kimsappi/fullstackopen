const dummy = blogs => {
	return 1;
};

const totalLikes = blogs => {
	return blogs.reduce((count, blog) => count + blog.likes, 0);	
};

module.exports = {
	dummy,
	totalLikes
};
