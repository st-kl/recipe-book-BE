const request = require('supertest');
const app = require('../app');
const client = require('../db/connection');
const testData = require('../db/data/test-data/index');
const { ObjectId } = require('mongodb');
const seed = require('../db/seed/seed');

beforeEach(() => seed(testData));
afterAll(() => client.close());

describe('GET api/recipes', () => {
  test('200 the db responds with an array containing 3 recipe objects', () => {
    return request(app)
      .get('/api/recipes')
      .expect(200)
      .then(({ body }) => {
        expect(body.recipes.length).toBe(3);
        expect(Array.isArray(body.recipes)).toBe(true);
      });
  });
  test('200 the db responds with an array containing all recipes by a specific user', () => {
    return request(app)
      .get('/api/recipes?userId=610a5e30ceac105ae4bc5bcb')
      .expect(200)
      .then(({ body }) => {
        expect(body.recipes.length).toBe(1);
        expect(Array.isArray(body.recipes)).toBe(true);
      });
  });
  test('200 the db responds with an array containing 2 isPublic recipes', () => {
    return request(app)
      .get('/api/recipes?isPublic=true')
      .expect(200)
      .then(({ body }) => {
        expect(body.recipes.length).toBe(2);
        expect(Array.isArray(body.recipes)).toBe(true);
      });
  });
  test('200 the db responds with an array containing all recipes sorted by the value stated', () => {
    return request(app)
      .get('/api/recipes?sortBy=created_at')
      .expect(200)
      .then(({ body }) => {
        expect(body.recipes.length).toBe(3);
        expect(Array.isArray(body.recipes)).toBe(true);
        expect(body.recipes).toBeSortedBy('created_at', { descending: true });
      });
  });
  test('200 the db responds with an array sorted in the appropriate order', () => {
    return request(app)
      .get('/api/recipes?sortBy=created_at&order=asc')
      .expect(200)
      .then(({ body }) => {
        expect(body.recipes.length).toBe(3);
        expect(Array.isArray(body.recipes)).toBe(true);
        expect(body.recipes).toBeSortedBy('created_at');
      });
  });
  test('200 the db responds with an array filtered one dietary requirement', () => {
    return request(app)
      .get('/api/recipes?vegan=true')
      .expect(200)
      .then(({ body }) => {
        expect(body.recipes.length).toBe(2);
        expect(Array.isArray(body.recipes)).toBe(true);
      });
  });
  test('200 the db responds with an array filtered by all dietary requirements', () => {
    return request(app)
      .get(
        '/api/recipes?vegan=true&vegetarian=false&dairyFree=true&glutenFree=false'
      )
      .expect(200)
      .then(({ body }) => {
        expect(body.recipes.length).toBe(1);
        expect(Array.isArray(body.recipes)).toBe(true);
        expect(body.recipes[0]._id).toBe('310a5e30ceac105ae4bc5bcb');
      });
  });
  test('200 the db responds with an array of queried recipe', () => {
    return request(app)
      .get('/api/recipes?recipeId=210a5e30ceac105ae4bc5bcb')
      .expect(200)
      .then(({ body }) => {
        expect(body.recipes.length).toBe(1);
        expect(Array.isArray(body.recipes)).toBe(true);
        expect(body.recipes[0]._id).toBe('210a5e30ceac105ae4bc5bcb');
      });
  });
});

describe('POST api/recipes', () => {
  test('201 new recipe details added to db', () => {
    const newRecipe = {
      _id: ObjectId('310a5e30ceac105ae4bc5bce'),
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
    };
    return request(app)
      .post('/api/recipes')
      .expect(201)
      .send(newRecipe)
      .expect(201)
      .then(({ body }) => {
        expect(body.status).toEqual({
          acknowledged: true,
          insertedId: '310a5e30ceac105ae4bc5bce',
        });
        expect(body.recipeIdArray).toEqual([
          '210a5e30ceac105ae4bc5bcb',
          '310a5e30ceac105ae4bc5bce',
        ]);
      });
  });
});

describe('PATCH api/recipes/:recipeId', () => {
  test('200: recipe object is updated and returns updated object within an array', () => {
    const patchedRecipe = {
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
    };
    return request(app)
      .patch('/api/recipes/310a5e30ceac105ae4bc5bcb')
      .send(patchedRecipe)
      .expect(200)
      .then(({ body }) => {
        expect(body).toBe(true);
      });
  });
});

describe('DELETE api/recipes/:recipeId', () => {
  test('204: delete recipe', () => {
    return request(app)
      .delete('/api/recipes/310a5e30ceac105ae4bc5bcb')
      .expect(204);
  });
});

describe('GET api/users', () => {
  test('200: returns ', () => {
    return request(app)
      .get('/api/users')
      .expect(200)
      .then(({ body }) => {
        expect(body.users.length).toBe(4);
        expect(Array.isArray(body.users)).toBe(true);
      });
  });
});

describe('POST api/users', () => {
  test('201: new user added to DB', () => {
    const newUser = {
      _id: ObjectId('810a5e30ceac105ae4bc5bce'),
      username: 'user5',
      name: 'name5',
      email: 'hello5@gmail.com',
      avatar_url: 'https://bit.ly/3rD32gb',
      recipes: [],
      created_at: new Date(1540965445410),
    };

    return request(app)
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual({
          acknowledged: true,
          insertedId: '810a5e30ceac105ae4bc5bce',
        });
      });
  });
});

describe('GET api/users/:userId', () => {
  test('200: returns ', () => {
    return request(app)
      .get('/api/users/610a5e30ceac105ae4bc5bcb')
      .expect(200)
      .then(({ body }) => {
        expect(body.users.length).toBe(1);
        expect(body.users[0]._id).toBe('610a5e30ceac105ae4bc5bcb');
        expect(Array.isArray(body.users)).toBe(true);
      });
  });
});

describe('DELETE api/users/:userId', () => {
  test('204: delete user', () => {
    return request(app)
      .delete('/api/users/610a5e30ceac105ae4bc5bcb')
      .expect(204);
  });
});

describe('PATCH api/users/:userId', () => {
  test('200: user object is updated and returns updated object within an array', () => {
    const patchedUser = {
      username: 'user1',
      name: 'nameA',
      avatar_url: 'https://bit.ly/3rD32gb',
      recipes: ['110a5e30ceac105ae4bc5bcb'],
      created_at: new Date(1610965445410),
    };
    return request(app)
      .patch('/api/users/610a5e30ceac105ae4bc5bcd')
      .send(patchedUser)
      .expect(200)
      .then(({ body }) => {
        expect(body).toBe(true);
      });
  });
});
