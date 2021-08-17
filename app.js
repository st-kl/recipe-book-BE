const cors = require('cors');
const express = require('express');
const { handleInvalidPath } = require('./errors/app.errors');
const apiRouter = require('./routes/api.router');

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// ------- Routers -------
app.use('/api', apiRouter);

// ------- Errors -------
app.all('/*', handleInvalidPath);

module.exports = app;
