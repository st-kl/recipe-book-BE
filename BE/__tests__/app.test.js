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
  test('status 200 the db responds with an array filtered by dietary requirements', () => {
    return request(app)
      .get('/api/recipes?sortBy=created_at&order=asc')
      .expect(200)
      .then(({ body }) => {
        expect(body.recipes.length).toBe(3);
        expect(Array.isArray(body.recipes)).toBe(true);
      }); //incomplete test finish later
  });
});
