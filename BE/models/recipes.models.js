const client = require('../db/connection');

exports.selectRecipes = async (
  userId,
  isPublic,
  sortBy = 'title',
  order = 'desc',
  vegan,
  vegetarian,
  glutenFree,
  dairyFree
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
  if (vegan === 'true') {
    queryObject.vegan = true;
  }
  if (vegetarian === 'true') {
    queryObject.vegetarian = true;
  }
  if (glutenFree === 'true') {
    queryObject.glutenFree = true;
  }
  if (dairyFree === 'true') {
    queryObject.dairyFree = true;
  }
  console.log(queryObject, '<<<---query');
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
