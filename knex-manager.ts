import { threadsToPorts } from './jest/threadsToPorts';
import { IConfig, IPgConfig } from './knexfile';
import * as config from './knexfile';

export interface IDbManager {
  dropDb: (db: string) => Promise<void>;
  createDb: (db: string) => Promise<void>;
  migrateDb: () => Promise<void>;
  close: () => Promise<void>;
  truncateDb: () => Promise<void>;
}

const dbManager: (thread: number) => IDbManager = (thread: number) => {
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
