const client = require('../db/connection');

exports.readUsers = async () => {
  await client.connect();
  const result = await client.db().collection('users').find().toArray();
  await client.close();
  return result;
};

exports.createUser = async (newUser) => {
  await client.connect();
  const result = await client.db().collection('users').insertOne(newUser);
  await client.close();
  return result;
};

exports.readUserById = async (userId) => {
  await client.connect();
  const result = await client.db().collection('users').findOne();
  await client.close();
  return [result];
};
