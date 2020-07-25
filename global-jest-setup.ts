import { dbManager } from './knex-manager';

module.exports = async () => {
  process.env.ENVIRONMENT = 'test';

  for (let i = 1; i <= 5; i++) {
    await dbManager(i).dropDb('testdb');
    await dbManager(i).createDb('testdb');
    await dbManager(i).migrateDb();
  }
};
