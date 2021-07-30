const {
  readRecipes,
  createRecipe,
  updateRecipe,
} = require('../models/recipes.models');

exports.getRecipes = (req, res, next) => {
  const {
    userId,
    isPublic,
    sortBy,
    order,
    vegan,
    vegetarian,
    glutenFree,
    dairyFree,
  } = req.query;

  readRecipes(
    userId,
    isPublic,
    sortBy,
    order,
    vegan,
    vegetarian,
    glutenFree,
    dairyFree
  )
    .then((recipes) => res.status(200).send({ recipes }))
    .catch(next);
};

exports.postRecipe = (req, res, next) => {
  const newRecipe = req.body;
  createRecipe(newRecipe)
    .then((recipes) => {
      res.status(201).send(recipes);
    })
    .catch(next);
};

exports.patchRecipe = (req, res, next) => {
  const patchedRecipe = req.body;
  const { recipeId } = req.params;
  updateRecipe(patchedRecipe, recipeId)
    .then((result) => {
      res.status(200).send(result.acknowledged);
    })
    .catch(next);
};
