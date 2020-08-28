const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./utils/config');
const app = express();
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

module.exports = app;
