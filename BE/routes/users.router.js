const {
  getUsers,
  postUser,
  getUserById,
  removeUser,
} = require("../controllers/users.controllers");

const usersRouter = require("express").Router();

usersRouter.route("/").get(getUsers).post(postUser);

usersRouter.route("/:userId").get(getUserById).delete(removeUser);

module.exports = usersRouter;
