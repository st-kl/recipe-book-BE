const client = require('../db/connection');

exports.readRecipes = async (
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
exports.createRecipe = async (newRecipe) => {
  const result = {};
  //POST NEW RECIPE
  await client.connect();
  result.status = await client.db().collection('recipes').insertOne(newRecipe);
  //UPDATE USER
  await client
    .db()
    .collection('users')
    .updateOne(
      { _id: newRecipe.userId },
      { $push: { recipes: newRecipe._id } }
    );
  //QUERY USER TO CHECK UPDATED ARRAY
  const user = await client
    .db()
    .collection('users')
    .findOne({ _id: newRecipe.userId });
  result.recipeIdArray = user.recipes;
  await client.close();

  return result;
};
