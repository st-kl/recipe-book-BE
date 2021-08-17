const client = require('../connection');

const seed = async (data) => {
  const { userData, recipeData } = data;

  await client.connect();
  await client.db().collection('recipes').drop();
  await client.db().collection('users').drop();
  await client.db().collection('users').insertMany(userData);
  await client.db().collection('recipes').insertMany(recipeData);
};

module.exports = seed;
