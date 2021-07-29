const apiRouter = require('express').Router();
const recipesRouter = require('./recipes.router');

// recipes router
apiRouter.use('/recipes', recipesRouter);

module.exports = apiRouter;
