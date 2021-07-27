const cors = require('cors');
const express = require('express');
const { getRecipes } = require('./controllers/recipes.controllers');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/recipes', getRecipes);

module.exports = app;
