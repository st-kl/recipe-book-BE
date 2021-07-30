const apiRouter = require('express').Router();
const recipesRouter = require('./recipes.router');
const usersRouter = require('./users.router');

// recipes router
apiRouter.use('/recipes', recipesRouter);
apiRouter.use('/users', usersRouter);

module.exports = apiRouter;
