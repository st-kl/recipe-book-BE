const recipesRouter = require('express').Router();
const {
  getRecipes,
  postRecipe,
  patchRecipe,
  removeRecipe,
} = require('../controllers/recipes.controllers');

recipesRouter.route('/').get(getRecipes).post(postRecipe);
recipesRouter.route('/:recipeId').patch(patchRecipe).delete(removeRecipe);

module.exports = recipesRouter;
