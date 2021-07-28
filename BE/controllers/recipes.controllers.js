const { selectRecipes } = require('../models/recipes.models');

exports.getRecipes = (req, res) => {
  selectRecipes().then((recipes) => res.status(200).send({ recipes }));
};
