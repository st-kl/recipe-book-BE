const recipesRouter = require('express').Router();
const {
  getRecipes,
  postRecipe,
  patchRecipe,
} = require('../controllers/recipes.controllers');

recipesRouter.route('/').get(getRecipes).post(postRecipe);

recipesRouter.route('/:recipeId').patch(patchRecipe);

module.exports = recipesRouter;
