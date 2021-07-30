const { readRecipes, createRecipe } = require('../models/recipes.models');

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
