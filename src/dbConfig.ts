import Knex from 'knex';
const config = require('../knexfile.js');
import { threadsToPorts } from '../threadsToPorts';

const knex = (() => {
  const configWithPort = config[process.env.ENVIRONMENT];
  configWithPort.connection.port = threadsToPorts[process.env.JEST_WORKER_ID];

  return Knex(configWithPort);
})();

export { knex };
