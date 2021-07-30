const { getUsers, postUser } = require('../controllers/users.controllers');

const usersRouter = require('express').Router();

usersRouter.route('/').get(getUsers).post(postUser);

module.exports = usersRouter;
