const { readUsers, createUser } = require('../models/users.models');

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
