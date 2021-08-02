const client = require("../db/connection");

exports.readUsers = async () => {
  await client.connect();
  const result = await client.db().collection("users").find().toArray();
  await client.close();
  return result;
};

exports.createUser = async (newUser) => {
  let result = {};
  await client.connect();
  const exists = await client
    .db()
    .collection("users")
    .findOne({ email: newUser.email });

  if (!exists) {
    result = await client.db().collection("users").insertOne(newUser);
    await client.close();
  }

  return result;
};

exports.readUserById = async (userId) => {
  await client.connect();
  const result = await client.db().collection("users").findOne({ _id: userId });
  await client.close();
  return [result];
};

exports.deleteUser = async (userId) => {
  await client.connect();

  const result = await client
    .db()
    .collection("users")
    .deleteOne({ _id: userId });

  await client.close();
  return result;
};
