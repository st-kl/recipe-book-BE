const db = require('./connection');

db.connect()
  .then(() => {
    console.log('Connected to Database');
  })
  .then(() => db.close())
  .catch((error) => console.error(error));
