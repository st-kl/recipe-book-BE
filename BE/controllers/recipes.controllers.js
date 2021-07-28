const { selectRecipes } = require('../models/recipes.models');

exports.getRecipes = (req, res, next) => {
  selectRecipes().then((recipes) => res.status(200).send({ recipes }));
};
