import { threadsToPorts } from './jest/threadsToPorts';
import { IConfig, IPgConfig } from './knexfile';
import * as config from './knexfile';

const dbManager = (thread: number) => {
  const configWithPort: IPgConfig = (config as IConfig)[
    process.env.ENVIRONMENT
  ];
  configWithPort.connection.port = threadsToPorts[thread];

  return require('knex-db-manager').databaseManagerFactory({
    knex: configWithPort,
    dbManager: {
      // db manager related configuration
      superUser: 'postgres',
      superPassword: 'mysecretpassword',
      // populatePathPattern: 'src/seeds/**/*.js', // glob format for searching seeds
    },
  });
};

export { dbManager };
