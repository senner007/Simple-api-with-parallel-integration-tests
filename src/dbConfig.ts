import Knex from 'knex';
const config = require('../knexfile.js');

const knex = (() => {
  return Knex(config[process.env.ENVIRONMENT]);
})();

export { knex };
