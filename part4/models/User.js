const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true
	},
	password: String,
	name: String,
});

userSchema.set('toJSON', {
	transform: (document, ret) => {
		ret.id = ret._id.toString();
		delete ret._id;
	}
})

userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);

module.exports = User;
