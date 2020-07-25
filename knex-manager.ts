const config = require('./knexfile.js');

const dbManager = (thread: number) => {
  const threadsToPorts: any = {
    1: 5433,
    2: 5434,
    3: 5435,
    4: 5436,
    5: 5437,
    6: 5438,
    7: 5439,
  };
  const configWithPort = config[process.env.ENVIRONMENT];
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
