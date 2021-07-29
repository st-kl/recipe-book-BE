const client = require('../db/connection');

exports.selectRecipes = async (
  userId,
  isPublic,
  sortBy = 'title',
  order = 'desc'
) => {
  const queryObject = {};
  const sortObject = {};
  const orderLookup = { desc: -1, asc: 1 };
  sortObject[sortBy] = orderLookup[order];
  if (userId) {
    queryObject.userId = Number(userId);
  }
  if (isPublic === 'true') {
    queryObject.isPublic = true;
  }
  if (isPublic === 'false') {
    queryObject.isPublic = false;
  }
  await client.connect();
  const result = await client
    .db()
    .collection('recipes')
    .find(queryObject)
    .sort(sortObject)
    .toArray();
  await client.close();
  return result;
};
