import Knex from 'knex';
import { IConfig, IPgConfig } from '../knexfile';
import { threadsToPorts } from '../jest/threadsToPorts';
import * as config from '../knexfile';

const knex = (() => {
  const configWithPort: IPgConfig = (config as IConfig)[
    process.env.ENVIRONMENT
  ];
  configWithPort.connection.port =
    threadsToPorts[Number(process.env.JEST_WORKER_ID)];

  return Knex(configWithPort);
})();

export { knex };
