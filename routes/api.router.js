const apiRouter = require('express').Router();
const { apiInfo } = require('../controllers/api.controllers');
const recipesRouter = require('./recipes.router');
const usersRouter = require('./users.router');

apiRouter.get('/', getApiInfo);
apiRouter.use('/recipes', recipesRouter);
apiRouter.use('/users', usersRouter);

module.exports = apiRouter;
