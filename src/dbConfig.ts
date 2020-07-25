import Knex from 'knex';
const config = require('../knexfile.js');

console.log(process.env.JEST_WORKER_ID);

const threadsToPorts: any = {
  1: 5433,
  2: 5434,
  3: 5435,
  4: 5436,
  5: 5437,
};
const thread = process.env.JEST_WORKER_ID;

const knex = (() => {
  const configWithPort = config[process.env.ENVIRONMENT];
  configWithPort.connection.port = threadsToPorts[thread];
  return Knex(configWithPort);
})();

export { knex };
