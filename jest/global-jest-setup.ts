import { dbManager } from '../knex-manager';

module.exports = async () => {
  process.env.ENVIRONMENT = 'test';

  const numberOfThreads: number = 4;

  for (let i = 1; i <= numberOfThreads; i++) {
    const dbManagerInstance = dbManager(i);
    await dbManagerInstance.dropDb('testdb');
    await dbManagerInstance.createDb('testdb');
    await dbManagerInstance.migrateDb();
    dbManagerInstance.close();
  }
};
