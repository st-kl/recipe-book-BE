# Recipe Book API

## Project

This is the backend for **Cookeroo**, my final coding bootcamp project at Northcoders (collaborators: [MariusCNicolae](https://github.com/MariusCNicolae), [sirKevlar](https://github.com/sirKevlar), [TeeBee20](https://github.com/TeeBee20)).

Cookeroo is a web application and online recipe book, into which recipes can be imported via a third party API, edited, refined and then viewed in an interactive way.

This RESTful API gives access to recipe and user information stored in a mongoDB database (non-relational). A productive version is hosted on Heroku:\
https://mycookeroo.herokuapp.com/api

### Tech Stack

- Database: `mongoDB Atlas`
- Server Framework: `express`
- Hosting: `Heroku`
- Testing: `Jest`

### Endpoints

| Endpoint                  | Methods           |
| ------------------------- | ----------------- |
| `/api`                    | GET               |
| `/api/recipes`            | GET, POST         |
| `/api/recipes/:recipe_id` | PATCH, DELETE     |
| `/api/users`              | GET, POST         |
| `/api/users/:user_id`     | GET, POST, DELETE |

---

## Setup

### Step 1 - Clone

- fork the repo
- clone it to your local machine: `git clone <url>`

### Step 2 - Install Dependencies

- in your cloned repo, open a new terminal and run `npm install` to install all packages
- if you don't need any of the dev dependencies, run `npm install --production`

### Step 3 - Create Databases

- create free mongoDB atlas databases (development and test) and note the credentials to get access (databasee user, user password and database names)

### Step 4 - Define Environment

- you will need to create two .env files for the project to work:
  - `.env.test`
  - `.env.development`
- into each, add `DBUSER=<db_user_name>`, `DBPASSWORD=<db_password>` and `DBNAME=<db_name>`with the correct details for that environment
- double check that these `.env` files are `.gitignored`

### Step 5 - Seed

- to seed the dev databases, run `npm run seed`
  - in the `run-seed.js` file you can select if you want to use `test` or `dev` data, the latter being more extensive
- the test database gets seeded every time jest is run

### Step 6 - Test

- run `run npm test` to run all tests
- run `npm test __tests__/<test-file-name>` to run a specific test file
- add `.only` to a `describe` or `it` to run selected tests only

### Step 7 - Run

- run `npm run dev` and head over to your browser to access endpoints (localhost, port 3000 by default)

---

## Version Requirements

- `Node.js`: 16.0.0 or higher
