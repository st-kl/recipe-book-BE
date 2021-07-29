const { selectRecipes } = require('../models/recipes.models');

exports.getRecipes = (req, res, next) => {
  const { userId, isPublic, sortBy, order } = req.query;
  selectRecipes(userId, isPublic, sortBy, order)
    .then((recipes) => res.status(200).send({ recipes }))
    .catch(next);
};
