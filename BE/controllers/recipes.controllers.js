const { selectRecipes } = require('../models/recipes.models');

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
  selectRecipes(
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
