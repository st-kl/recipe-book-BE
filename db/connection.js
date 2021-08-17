const path = require('path');
const { MongoClient } = require('mongodb');

const ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: path.resolve(__dirname, `../.env.${ENV}`),
});

if (!process.env.DBUSER || !process.env.DBPASSWORD || !process.env.DBNAME) {
  throw new Error('DBUSER, DBPASSWORD or DBNAME not set');
}

const connectionString = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@projectcluster.ddwi5.mongodb.net/${process.env.DBNAME}`;

module.exports = new MongoClient(connectionString);
