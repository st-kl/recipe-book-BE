const { ObjectId } = require('mongodb');
const client = require('../db/connection');

exports.readRecipes = async (
  userId,
  isPublic,
  sortBy = 'title',
  order = 'desc',
  vegan,
  vegetarian,
  glutenFree,
  dairyFree,
  recipeId
) => {
  const queryObject = {};
  const sortObject = {};
  const orderLookup = { desc: -1, asc: 1 };

  sortObject[sortBy] = orderLookup[order];
  if (userId) {
    queryObject.userId = userId;
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
  if (recipeId) {
    if (recipeId.length != 1) {
      queryObject._id = new ObjectId(recipeId);
    }
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
      { _id: ObjectId(newRecipe.userId) },
      { $push: { recipes: newRecipe._id } }
    );
  //QUERY USER TO CHECK UPDATED ARRAY
  const user = await client
    .db()
    .collection('users')
    .findOne({ _id: ObjectId(newRecipe.userId) });
  result.recipeIdArray = user.recipes;
  await client.close();

  return result;
};

exports.updateRecipe = async (patchedRecipe, recipeId) => {
  await client.connect();
  const result = await client
    .db()
    .collection('recipes')
    .updateOne({ _id: ObjectId(recipeId) }, { $set: patchedRecipe });
  await client.close();
  return result;
};

exports.deleteRecipe = async (recipeId) => {
  let userId;
  //query user to extract user id
  await client.connect();
  const user = await client
    .db()
    .collection('recipes')
    .findOne({ _id: ObjectId(recipeId) });
  userId = user.userId;
  //remove recipe id from user document
  await client
    .db()
    .collection('users')
    .updateOne({ _id: ObjectId(userId) }, { $pull: { recipes: recipeId } });
  //delete recipe
  const result = await client
    .db()
    .collection('recipes')
    .deleteOne({ _id: ObjectId(recipeId) });

  await client.close();
  return result;
};
