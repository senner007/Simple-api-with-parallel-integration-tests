import { dbManager } from './knex-manager';

module.exports = async () => {
    process.env.ENVIRONMENT = 'test'
    await dbManager.dropDb('testdb');
    await dbManager.createDb('testdb');
    await dbManager.migrateDb();
}