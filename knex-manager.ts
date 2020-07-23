const config = require('./knexfile.js');
const dbManager = require('knex-db-manager').databaseManagerFactory({
  knex : config.test,
  dbManager: {
    // db manager related configuration
    superUser: 'postgres',
    superPassword: 'mysecretpassword',
    // populatePathPattern: 'src/seeds/**/*.js', // glob format for searching seeds
  },
});

export {
  dbManager
}
