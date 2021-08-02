const request = require("supertest");
const app = require("../app");
const client = require("../db/connection");
const testData = require("../db/data/test-data/index");

const seed = require("../db/seed/seed");
jest.setTimeout(100000);
beforeEach(() => seed(testData));
afterAll(() => client.close());

describe("GET api/recipes", () => {
  test("200 the db responds with an array containing 3 recipe objects", () => {
    return request(app)
      .get("/api/recipes")
      .expect(200)
      .then(({ body }) => {
        expect(body.recipes.length).toBe(3);
        expect(Array.isArray(body.recipes)).toBe(true);
      });
  });
  test("200 the db responds with an array containing all recipes by a specific user", () => {
    return request(app)
      .get("/api/recipes?userId=2")
      .expect(200)
      .then(({ body }) => {
        expect(body.recipes.length).toBe(1);
        expect(Array.isArray(body.recipes)).toBe(true);
      });
  });
  test("200 the db responds with an array containing 2 isPublic recipes", () => {
    return request(app)
      .get("/api/recipes?isPublic=true")
      .expect(200)
      .then(({ body }) => {
        expect(body.recipes.length).toBe(2);
        expect(Array.isArray(body.recipes)).toBe(true);
      });
  });
  test("200 the db responds with an array containing all recipes sorted by the value stated", () => {
    return request(app)
      .get("/api/recipes?sortBy=created_at")
      .expect(200)
      .then(({ body }) => {
        expect(body.recipes.length).toBe(3);
        expect(Array.isArray(body.recipes)).toBe(true);
        expect(body.recipes).toBeSortedBy("created_at", { descending: true });
      });
  });
  test("200 the db responds with an array sorted in the appropriate order", () => {
    return request(app)
      .get("/api/recipes?sortBy=created_at&order=asc")
      .expect(200)
      .then(({ body }) => {
        expect(body.recipes.length).toBe(3);
        expect(Array.isArray(body.recipes)).toBe(true);
        expect(body.recipes).toBeSortedBy("created_at");
      });
  });
  test("200 the db responds with an array filtered one dietary requirement", () => {
    return request(app)
      .get("/api/recipes?vegan=true")
      .expect(200)
      .then(({ body }) => {
        expect(body.recipes.length).toBe(2);
        expect(Array.isArray(body.recipes)).toBe(true);
      });
  });
  test("200 the db responds with an array filtered by all dietary requirements", () => {
    return request(app)
      .get(
        "/api/recipes?vegan=true&vegetarian=false&dairyFree=true&glutenFree=false"
      )
      .expect(200)
      .then(({ body }) => {
        expect(body.recipes.length).toBe(1);
        expect(Array.isArray(body.recipes)).toBe(true);
        expect(body.recipes[0]._id).toBe("3");
      });
  });
  test("200 the db responds with an array of queried recipe", () => {
    return request(app)
      .get("/api/recipes?recipeId=2")
      .expect(200)
      .then(({ body }) => {
        expect(body.recipes.length).toBe(1);
        expect(Array.isArray(body.recipes)).toBe(true);
        expect(body.recipes[0]._id).toBe("2");
      });
  });
});

describe("POST api/recipes", () => {
  test("201 new recipe details added to db", () => {
    const newRecipe = {
      _id: "4",
      title: "recipe4",
      servings: 8,
      preparationTime: 500,
      cookingTime: 20,
      totalTime: 520,
      image: "https://bit.ly/2TFtQQd",
      isPublic: true,
      notes: "disgusting",
      userId: "2",
      created_at: new Date(1618964020514),
      equipment: ["knife, fork", "shovel"],
      ingredients: [
        { name: "onion", amount: 1, unit: "piece" },
        { name: "sugar", amount: 0.5, unit: "cups" },
      ],
      instructions: [
        { step: 1, description: "do step 1 again" },
        { step: 2, description: "do step 2 again" },
      ],

      vegan: true,
      vegetarian: true,
      dairyFree: true,
      glutenFree: true,
    };
    return request(app)
      .post("/api/recipes")
      .expect(201)
      .send(newRecipe)
      .expect(201)
      .then(({ body }) => {
        expect(body.status).toEqual({ acknowledged: true, insertedId: "4" });
        expect(body.recipeIdArray).toEqual(["2", "4"]);
      });
  });
});

describe("PATCH api/recipes/:recipeId", () => {
  test("200: recipe object is updated and returns updated object within an array", () => {
    const patchedRecipe = {
      _id: "3",
      title: "recipe3",
      servings: 6,
      preparationTime: 10,
      cookingTime: 10,
      totalTime: 20,
      image: "https://bit.ly/2TFtQQd",
      isPublic: false,
      notes: "awesome",
      userId: "3",
      created_at: new Date(161220020514),
      equipment: ["spoon, plate"],
      ingredients: [
        { name: "pepper", amount: 1, unit: "piece" },
        { name: "wine", amount: 1, unit: "bottle" },
      ],
      instructions: ["do 1", "do 2", "do 3"],
      vegan: true,
      vegetarian: false,
      dairyFree: true,
      glutenFree: false,
    };
    return request(app)
      .patch("/api/recipes/3")
      .send(patchedRecipe)
      .expect(200)
      .then(({ body }) => {
        expect(body).toBe(true);
      });
  });
});

describe("DELETE api/recipes/:recipeId", () => {
  test("204: delete recipe", () => {
    return request(app).delete("/api/recipes/1").expect(204);
  });
});

describe("GET api/users", () => {
  test("200: returns ", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(body.users.length).toBe(4);
        expect(Array.isArray(body.users)).toBe(true);
      });
  });
});

describe("POST api/users", () => {
  test("201: new user added to DB", () => {
    const newUser = {
      _id: "5",
      username: "user5",
      name: "name5",
      avatar_url: "https://bit.ly/3rD32gb",
      recipes: [],
      created_at: new Date(1540965445410),
    };

    return request(app)
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual({ acknowledged: true, insertedId: "5" });
      });
  });
});

describe("GET api/users/:userId", () => {
  test("200: returns ", () => {
    return request(app)
      .get("/api/users/2")
      .expect(200)
      .then(({ body }) => {
        expect(body.users.length).toBe(1);
        expect(body.users[0]._id).toBe("2");
        expect(Array.isArray(body.users)).toBe(true);
      });
  });
});

describe("DELETE api/users/:userId", () => {
  test("204: delete user", () => {
    return request(app).delete("/api/users/2").expect(204);
  });
});

describe("PATCH api/users/:userId", () => {
  test("200: user object is updated and returns updated object within an array", () => {
    const patchedUser = {
      _id: "1",
      username: "user1",
      name: "nameA",
      avatar_url: "https://bit.ly/3rD32gb",
      recipes: ["1"],
      created_at: new Date(1610965445410),
    };
    return request(app)
      .patch("/api/users/1")
      .send(patchedUser)
      .expect(200)
      .then(({ body }) => {
        expect(body).toBe(true);
      });
  });
});
