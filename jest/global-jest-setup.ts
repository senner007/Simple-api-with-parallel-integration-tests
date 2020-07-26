import { dbManager } from '../knex-manager';

module.exports = async () => {
  process.env.ENVIRONMENT = 'test';

  const numberOfThreads: number = 4;

  for (let i = 1; i <= numberOfThreads; i++) {
    await dbManager(i).dropDb('testdb');
    await dbManager(i).createDb('testdb');
    await dbManager(i).migrateDb();
  }
};
