const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

/* Express setup */
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan(function (tokens, req, res) {
	let tokenArr = [
		tokens.method(req, res),
		tokens.url(req, res),
		tokens.status(req, res),
		tokens.res(req, res, 'content-length'), '-',
		tokens['response-time'](req, res), 'ms'
	];
	if (req.method.toLowerCase() === 'post')
		tokenArr = tokenArr.concat(JSON.stringify(req.body));
	return tokenArr.join(' ');
}));

/* Routes */
app.get('/api/persons', (req, res) => {
	Person
		.find({})
		.then(persons => {
			res.json(persons.map(person => person.toJSON()));
		});
});

app.post('/api/persons', (req, res) => {
	const newPerson = req.body;
	for (let field of [newPerson.name, newPerson.number]) {
		if (typeof field === 'undefined' || !field.toString().length)
			return res.status(400).json({ error: 'name or number missing from request' });
	};
	const newPersonModel = new Person(newPerson);
	newPersonModel
		.save()
		.then(response => res.json(response.toJSON()));
	/*if (persons.find(entry => entry.name.toLowerCase() === newPerson.name.toLowerCase())) {
		return res.status(400).json({error: 'name must be unique'}).end();}
	do {
		var newId = Math.floor(Math.random() * 999999);
	} while (persons.find(entry => entry.id === newId));
	const newPersonWithId = {...newPerson, id: newId}
	persons = persons.concat(newPersonWithId);
	res.json(newPersonWithId);*/
});

app.get('/api/persons/:id', (req, res, next) => {
	Person
		.findById(req.params.id)
		.then(response => res.send(response.toJSON()))
		.catch(error => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
	Person
		.findByIdAndRemove(req.params.id)
		.then(result => res.status(204).end())
		.catch(error => next(error));
})

app.get('/info', (req, res) => {
	const datetime = new Date();
	res.header('Content-Type', 'text/html');
	const html = `Phonebook has info for ${persons.length} people<br><br>${datetime}`;
	res.send(html);
});

const PORT = 3001;
const IP = '0.0.0.0'; // TODO remove for final submission
app.listen(PORT, IP, () => {
	console.log(`Server running on port ${PORT}`)
});

const errorHandler = (error, request, response, next) => {
	console.error(error.message);

	if (error.name === 'CastError' && error.kind === 'ObjectId') {
		return response.status(400).send({ error: 'malformatted id' });
	}

	next(error);
}

app.use(errorHandler);