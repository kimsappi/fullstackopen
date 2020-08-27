const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	name: String,
});

userSchema.set('toJSON', {
	transform: (document, ret) => {
		ret.id = ret._id.toString();
		delete ret._id;
	}
})
  
const User = mongoose.model('User', userSchema)

module.exports = User;
