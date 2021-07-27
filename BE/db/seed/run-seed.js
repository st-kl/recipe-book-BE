const client = require('../connection');
const seed = require('./seed');
const testData = require('../data/test-data/index');

const runSeed = () => seed(testData).then(() => client.close());
runSeed();
