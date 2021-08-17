const client = require('../connection');
const seed = require('./seed');
const testData = require('../data/test-data/index');
const devData = require('../data/dev-data/index');

const runSeed = () => seed(devData).then(() => client.close());
runSeed();
