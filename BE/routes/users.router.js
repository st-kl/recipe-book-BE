const {
  getUsers,
  postUser,
  getUserById,
} = require('../controllers/users.controllers');

const usersRouter = require('express').Router();

usersRouter.route('/').get(getUsers).post(postUser);

usersRouter.route('/:userId').get(getUserById);

module.exports = usersRouter;
