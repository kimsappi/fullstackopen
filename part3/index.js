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

// Return all entries
app.get('/api/persons', (req, res) => {
	Person
		.find({})
		.then(persons => {
			res.json(persons.map(person => person.toJSON()));
		});
});

// Post new entry
app.post('/api/persons', (req, res, next) => {
	const newPersonModel = new Person(req.body);
	newPersonModel
		.save()
		.then(response => res.json(response.toJSON()))
		.catch(error => next(error));
	/*if (persons.find(entry => entry.name.toLowerCase() === newPerson.name.toLowerCase())) {
		return res.status(400).json({error: 'name must be unique'}).end();}
	do {
		var newId = Math.floor(Math.random() * 999999);
	} while (persons.find(entry => entry.id === newId));
	const newPersonWithId = {...newPerson, id: newId}
	persons = persons.concat(newPersonWithId);
	res.json(newPersonWithId);*/
});

// Get single entry by id
app.get('/api/persons/:id', (req, res, next) => {
	Person
		.findById(req.params.id)
		.then(response => res.send(response.toJSON()))
		.catch(error => next(error));
});

// Delete single entry by id
app.delete('/api/persons/:id', (req, res, next) => {
	Person
		.findByIdAndDelete(req.params.id)
		.then(result => res.send(result.toJSON()))
		.catch(error => next(error));
});

// Update old entry with new number
app.put('/api/persons/:id', (req, res, next) => {
	Person
		.findByIdAndUpdate(req.params.id,
			{number: req.body.number},
			{runValidators: true})
		.then(response => {
			response.number = req.body.number;
			return res.send(response.toJSON());
		})
		.catch(error => next(error));
});

// Return basic info about state of service
app.get('/info', (req, res) => {
	const datetime = new Date();
	res.header('Content-Type', 'text/html');
	Person
		.find({})
		.then(persons => {
			const html = `Phonebook has info for ${persons.length} people<br><br>${datetime}`;
			return res.send(html);
		});
});

/* Error handling & 404 */
const unknownEndpoint = (request, response) => {
	response.status(404).send({error: 'unknown endpoint'});
};

const errorHandler = (error, request, response, next) => {
	console.error(error.message);

	if (error.name === 'CastError' && error.kind === 'ObjectId') {
		return response.status(400).json({ error: 'malformatted id' });
	}
	if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message });
	}

	next(error);
};

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = 3001;
const IP = '0.0.0.0'; // TODO remove for final submission
app.listen(PORT, IP, () => {
	console.log(`Server running on port ${PORT}`);
});
