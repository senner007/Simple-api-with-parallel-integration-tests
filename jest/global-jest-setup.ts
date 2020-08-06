import { dbManager, IDbManager } from '../knex-manager';

module.exports = async () => {
  process.env.ENVIRONMENT = 'test';

  const numberOfThreads: number = 4;

  for (let i: number = 1; i <= numberOfThreads; i++) {
    const dbManagerInstance: IDbManager = dbManager(i);
    await dbManagerInstance.dropDb('testdb');
    await dbManagerInstance.createDb('testdb');
    await dbManagerInstance.migrateDb();
    dbManagerInstance.close();
  }
};
