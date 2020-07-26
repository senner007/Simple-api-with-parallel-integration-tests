import { threadsToPorts } from './jest/threadsToPorts';
import { config, IConfigEnvironment } from './knexfile';

const dbManager = (thread: number) => {
  const configWithPort: IConfigEnvironment = config[process.env.ENVIRONMENT];
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
