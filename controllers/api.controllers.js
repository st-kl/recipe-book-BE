apiInfo = {
  'GET /api': {
    description:
      'serves up a json representation of all the available endpoints of the api',
  },
  'GET /api/recipes': {
    description: 'serves an array of all reviews',
    queries: [
      'dietryInfo',
      'isPublic',
      'sort_by',
      'order',
      'userId',
      'recipeId',
    ],
    exampleResponse: {
      recipes: [
        {
          _id: '110a5e30ceac105ae4bc5bcb',
          title: 'recipe1',
          servings: 4,
          preparationTime: 20,
          cookingTime: 60,
          totalTime: 80,
          image: 'https://bit.ly/2TFtQQd',
          isPublic: false,
          notes: 'delicious',
          userId: '610a5e30ceac105ae4bc5bca',
          created_at: new Date(1610964020514),
          equipment: ['spatula, pan, pot'],
          ingredients: [
            { name: 'onion', amount: 1, unit: 'cup' },
            { name: 'cucumber', amount: 1, unit: 'piece' },
          ],
          instructions: ['do step 1', 'do step 2'],
          vegan: false,
          vegetarian: false,
          dairyFree: false,
          glutenFree: true,
        },
      ],
    },
  },
  'POST /api/recipes': {
    description:
      'serves an object with an acknowledgement and the ID of the inserted recipe',
    body: {
      title: 'recipe4',
      servings: 8,
      preparationTime: 500,
      cookingTime: 20,
      totalTime: 520,
      image: 'https://bit.ly/2TFtQQd',
      isPublic: true,
      notes: 'disgusting',
      userId: '610a5e30ceac105ae4bc5bcb',
      created_at: new Date(1618964020514),
      equipment: ['knife, fork', 'shovel'],
      ingredients: [
        { name: 'onion', amount: 1, unit: 'piece' },
        { name: 'sugar', amount: 0.5, unit: 'cups' },
      ],
      instructions: [
        { step: 1, description: 'do step 1 again' },
        { step: 2, description: 'do step 2 again' },
      ],

      vegan: true,
      vegetarian: true,
      dairyFree: true,
      glutenFree: true,
    },
    exampleResponse: {
      acknowledged: true,
      insertedId: '310a5e30ceac105ae4bc5bce',
    },
  },
  'PATCH /api/recipes/:recipe_id': {
    description: 'serves an object with a response when patch was successful',
    body: {
      title: 'recipe3',
      servings: 6,
      preparationTime: 10,
      cookingTime: 10,
      totalTime: 20,
      image: 'https://bit.ly/2TFtQQd',
      isPublic: false,
      notes: 'awesome',
      userId: '3',
      created_at: new Date(161220020514),
      equipment: ['spoon, plate'],
      ingredients: [
        { name: 'pepper', amount: 1, unit: 'piece', key: { key: 'test' } },
        { name: 'wine', amount: 1, unit: 'bottle' },
        { name: 'wine', amount: 1, unit: 'bottle' },
      ],
      instructions: ['do 1', 'do 2', 'do 3'],
      vegan: true,
      anotherKey: false,
      vegetarian: false,
      dairyFree: true,
      glutenFree: false,
    },
    exampleResponse: { body: true },
  },
  'DELETE /api/recipes/:recipe_id': {
    description: 'deletes specified recipe',
  },
  'GET /api/users': {
    description: 'serves an array of all users',
    exampleResponse: {
      users: [
        {
          _id: '610a5e30ceac105ae4bc5bca',
          username: 'user1',
          name: 'name1',
          email: 'hello1@gmail.com',
          avatar_url: 'https://bit.ly/3rD32gb',
          recipes: ['110a5e30ceac105ae4bc5bcb'],
          created_at: new Date(1610965445410),
        },
      ],
    },
  },
  'POST /api/users': {
    description:
      'serves an object with an acknowledgement and the ID of the inserted user',
    body: {
      username: 'user5',
      name: 'name5',
      email: 'hello5@gmail.com',
      avatar_url: 'https://bit.ly/3rD32gb',
      recipes: [],
      created_at: new Date(1540965445410),
    },
    exampleResponse: {
      acknowledged: true,
      insertedId: '810a5e30ceac105ae4bc5bce',
    },
  },
  'PATCH /api/users/:user_id': {
    description: 'serves an object with a response when patch was successful',
    body: {
      username: 'user1',
      name: 'nameA',
      avatar_url: 'https://bit.ly/3rD32gb',
      recipes: ['110a5e30ceac105ae4bc5bcb'],
      created_at: new Date(1610965445410),
    },
    exampleResponse: { body: true },
  },
  'DELETE /api/users/:user_id': {
    description: 'deletes specified user',
  },
  'GET /api/users/:user_id': {
    description: 'serves an array with specified user',
    exampleResponse: {
      users: [
        {
          _id: '610a5e30ceac105ae4bc5bca',
          username: 'user1',
          name: 'name1',
          email: 'hello1@gmail.com',
          avatar_url: 'https://bit.ly/3rD32gb',
          recipes: ['110a5e30ceac105ae4bc5bcb'],
          created_at: new Date(1610965445410),
        },
      ],
    },
  },
};

getApiInfo = (req, res, next) => {
  res.status(200).send({ apiInfo });
};

module.exports = { apiInfo, getApiInfo };
