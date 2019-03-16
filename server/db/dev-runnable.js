const dropTables = require('./dropTables')();
const createTables = require('./createTables')();

module.exports = {
  createTables,
  dropTables,
};

require('make-runnable');
