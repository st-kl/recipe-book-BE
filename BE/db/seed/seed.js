const client = require('../connection');

const seed = async (data) => {
  const { userData, recipeData } = data;

  await client.connect();
  await client.db().collection('recipes').drop();
  await client.db().collection('users').drop();
  await client.db().collection('users').insertOne(userData[0]);
  await client.db().collection('recipes').insertOne(recipeData[0]);
};

module.exports = seed;
