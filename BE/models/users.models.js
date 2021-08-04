const client = require('../db/connection');
const { ObjectId } = require('mongodb');

exports.readUsers = async () => {
  await client.connect();
  const result = await client.db().collection('users').find().toArray();
  await client.close();
  return result;
};

exports.createUser = async (newUser) => {
  let result = {};
  await client.connect();
  const exists = await client
    .db()
    .collection('users')
    .findOne({ email: newUser.email });

  if (!exists) {
    result = await client.db().collection('users').insertOne(newUser);
    await client.close();
  }
  console.log(result);
  return result;
};

exports.readUserById = async (userId) => {
  await client.connect();
  const result = await client
    .db()
    .collection('users')
    .findOne({ _id: ObjectId(userId) });
  await client.close();
  return [result];
};

exports.deleteUser = async (userId) => {
  await client.connect();

  const result = await client
    .db()
    .collection('users')
    .deleteOne({ _id: ObjectId(userId) });

  await client.close();
  return result;
};

exports.updateUser = async (patchedUser, userId) => {
  await client.connect();
  const result = await client
    .db()
    .collection('users')
    .updateOne({ _id: ObjectId(userId) }, { $set: patchedUser });
  await client.close();
  return result;
};
