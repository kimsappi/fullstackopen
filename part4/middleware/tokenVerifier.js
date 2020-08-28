const jwt = require('jsonwebtoken');

const config = require('../utils/config');
const User = require('../models/User')

const extractToken = req => {
	const authHeader = req.headers.authorization;
	if (authHeader && authHeader.toLowerCase().startsWith('bearer '))
		return authHeader.substring(7);
	else
		return null;
}

const tokenVerifier = async (req, res, next) => {
	const token = extractToken(req)
	if (token) {
		const tokenData = jwt.verify(token, config.TOKEN_SECRET);
		if (tokenData)
			req.user = await User.findById(tokenData.id);
	}
	next();
};

module.exports = tokenVerifier;
