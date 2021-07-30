const request = require('supertest');
const app = require('../app');
const client = require('../db/connection');
const testData = require('../db/data/test-data/index');

const seed = require('../db/seed/seed');

beforeEach(() => seed(testData));
afterAll(() => client.close());

describe('GET api/recipes', () => {
  test('status 200 the db responds with an array containing 3 recipe objects', () => {
    return request(app)
      .get('/api/recipes')
      .expect(200)
      .then(({ body }) => {
        expect(body.recipes.length).toBe(3);
        expect(Array.isArray(body.recipes)).toBe(true);
      });
  });
  test('status 200 the db responds with an array containing all recipes by a specific user', () => {
    return request(app)
      .get('/api/recipes?userId=2')
      .expect(200)
      .then(({ body }) => {
        expect(body.recipes.length).toBe(1);
        expect(Array.isArray(body.recipes)).toBe(true);
      });
  });
  test('status 200 the db responds with an array containing 2 isPublic recipes', () => {
    return request(app)
      .get('/api/recipes?isPublic=true')
      .expect(200)
      .then(({ body }) => {
        expect(body.recipes.length).toBe(2);
        expect(Array.isArray(body.recipes)).toBe(true);
      });
  });
  test('status 200 the db responds with an array containing all recipes sorted by the value stated', () => {
    return request(app)
      .get('/api/recipes?sortBy=created_at')
      .expect(200)
      .then(({ body }) => {
        expect(body.recipes.length).toBe(3);
        expect(Array.isArray(body.recipes)).toBe(true);
        expect(body.recipes).toBeSortedBy('created_at', { descending: true });
      });
  });
  test('status 200 the db responds with an array sorted in the appropriate order', () => {
    return request(app)
      .get('/api/recipes?sortBy=created_at&order=asc')
      .expect(200)
      .then(({ body }) => {
        expect(body.recipes.length).toBe(3);
        expect(Array.isArray(body.recipes)).toBe(true);
        expect(body.recipes).toBeSortedBy('created_at');
      });
  });
  test('status 200 the db responds with an array filtered one dietary requirement', () => {
    return request(app)
      .get('/api/recipes?vegan=true')
      .expect(200)
      .then(({ body }) => {
        expect(body.recipes.length).toBe(2);
        expect(Array.isArray(body.recipes)).toBe(true);
      });
  });
  test('status 200 the db responds with an array filtered by all dietary requirements', () => {
    return request(app)
      .get(
        '/api/recipes?vegan=true&vegetarian=false&dairyFree=true&glutenFree=false'
      )
      .expect(200)
      .then(({ body }) => {
        expect(body.recipes.length).toBe(1);
        expect(Array.isArray(body.recipes)).toBe(true);
        expect(body.recipes[0]._id).toBe(3);
      });
  });
});

describe('POST api/recipes', () => {
  test.only('status 201 new recipe details added to db', () => {
    const newRecipe = {
      _id: 4,
      title: 'recipe4',
      servings: 8,
      preparationTime: 500,
      cookingTime: 20,
      totalTime: 520,
      image: 'https://bit.ly/2TFtQQd',
      isPublic: true,
      notes: 'disgusting',
      userId: 2,
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
        console.log(body, 'BODY<<<<<<');
        expect(body.status).toEqual({ acknowledged: true, insertedId: 4 });
        expect(body.recipeIdArray).toEqual([2, 4]);
      });
  });
});

// describe('PATCH api/recipes/:recipeId', () => {
//   test('status 200 recipe object is updated and returns updated object within an array', () => {
//     const patchedRecipeElements = {
//       isPublic: false,
//       instructions: []
//     }
//     return request(app)
//   });
// });
