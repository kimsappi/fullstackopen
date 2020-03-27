require('dotenv').config();
const mongoose = require('mongoose');

if (process.argv.length < 3) {
	console.log('give password as argument');
	process.exit(1);
}

const dbPassword = process.argv[2];
const dbUrl = process.env.MONGODB_URI;

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
	name: String,
	number: String
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
	Person
		.find({})
		.then(result => {
			console.log('phonebook:');
			result.forEach(person =>
				console.log(`${person.name} ${person.number}`));
			mongoose.connection.close();
		})
}

if (process.argv.length === 5) {
	const newPerson = new Person({
		name: process.argv[3],
		number: process.argv[4]
	});
	newPerson
		.save()
		.then(response => {
			console.log(`added ${response.name} number ${response.number} to phonebook`);
			mongoose.connection.close();
		});
}