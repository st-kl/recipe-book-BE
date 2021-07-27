const path = require('path');
const { MongoClient } = require('mongodb');

const ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: path.resolve(__dirname, `../.env.${ENV}`),
});

if (!process.env.DBUSER || !process.env.DBPASSWORD) {
  throw new Error('DBUSER or DBPASSWORD not set');
}

const connectionString = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@projectcluster.ddwi5.mongodb.net`;

module.exports = new MongoClient(connectionString);
