const path = require('path');
const { MongoClient } = require('mongodb').MongoClient;

const ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: path.resolve(__dirname, `../.env.${ENV}`),
});

if (!process.env.DBUSER || !process.env.DBPASSWORD) {
  throw new Error('DBUSER or DBPASSWORD not set');
}

const connectionString = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@projectcluster.ddwi5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

MongoClient.connect(connectionString, (err) => {
  if (err) return console.error(err);
  console.log('Connected to Database');
});
