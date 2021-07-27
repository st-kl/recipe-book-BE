const { selectRecipes } = require('../models/recipes.models');

exports.getRecipes = (req, res, next) => {
  selectRecipes().then((result) => console.log(result));
};
