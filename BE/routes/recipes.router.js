const recipesRouter = require('express').Router();
const {
  getRecipes,
  postRecipe,
} = require('../controllers/recipes.controllers');

recipesRouter.route('/').get(getRecipes).post(postRecipe);

module.exports = recipesRouter;
