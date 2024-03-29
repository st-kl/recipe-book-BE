const {
  readUsers,
  createUser,
  readUserById,
  deleteUser,
  updateUser,
} = require("../models/users.models");

exports.getUsers = (req, res, next) => {
  readUsers()
    .then((users) => res.status(200).send({ users }))
    .catch(next);
};

exports.postUser = (req, res, next) => {
  const newUser = req.body;
  createUser(newUser)
    .then((confirmation) => {
      res.status(201).send(confirmation);
    })
    .catch(next);
};

exports.getUserById = (req, res, next) => {
  const { userId } = req.params;
  readUserById(userId)
    .then((users) => res.status(200).send({ users }))
    .catch(next);
};

exports.removeUser = (req, res, next) => {
  const { userId } = req.params;
  deleteUser(userId)
    .then(() => res.status(204).send())
    .catch(next);
};

exports.patchUser = (req, res, next) => {
  const patchedUser = req.body;
  const { userId } = req.params;
  updateUser(patchedUser, userId)
    .then((result) => {
      res.status(200).send(result.acknowledged);
    })
    .catch(next);
};
