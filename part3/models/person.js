require('dotenv').config();
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI;
console.log('connecting to', url);

mongoose
	.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true
	})
	.then(() => {
		console.log('connected to MongoDB');
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message);
	});

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: 3,
		required: true,
		unique: true,
		uniqueCaseInsensitive: true
	},
	number: {
		type: String,
		validate: {
			validator: number => (number.match(/[0-9]/g) || []).length > 7,
			message: 'Number needs to contain at least 8 digits'
		},
		required: true
	}
});
personSchema.plugin(uniqueValidator);

personSchema.set('toJSON', {
	transform: (document, ret) => {
		ret.id = ret._id.toString();
		delete ret._id;
		delete ret.__v;
	}
});


module.exports = mongoose.model('Person', personSchema);