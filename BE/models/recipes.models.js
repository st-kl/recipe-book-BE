const client = require('../db/connection');

exports.selectRecipes = async () => {
  await client.connect();
  const result = await client.db().collection('recipes').find().toArray();
  await client.close();
  return result;
};
