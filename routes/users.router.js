const {
  getUsers,
  postUser,
  getUserById,
  removeUser,
  patchUser,
} = require('../controllers/users.controllers');
const usersRouter = require('express').Router();

usersRouter.route('/').get(getUsers).post(postUser);
usersRouter
  .route('/:userId')
  .get(getUserById)
  .delete(removeUser)
  .patch(patchUser);

module.exports = usersRouter;
