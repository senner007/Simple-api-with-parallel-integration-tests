import Knex from 'knex';
import { config, IConfigEnvironment } from '../knexfile';
import { threadsToPorts } from '../jest/threadsToPorts';

const knex = (() => {
  const configWithPort: IConfigEnvironment = config[process.env.ENVIRONMENT];
  configWithPort.connection.port =
    threadsToPorts[Number(process.env.JEST_WORKER_ID)];

  return Knex(configWithPort);
})();

export { knex };
