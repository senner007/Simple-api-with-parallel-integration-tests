import { dbManager } from '../knex-manager';
import Knex from 'knex';

export async function TEST_SEEDS(thread: number): Promise<void> {
  // TODO : could require all and run sequentially
  const knexInstance: Knex = dbManager(thread).knexInstance();

  await require('../src/seeds/development/01.roles').seed(knexInstance);
  await require('../src/seeds/development/02.users').seed(knexInstance);
  await require('../src/seeds/development/03.user-roles').seed(knexInstance);
  await require('../src/seeds/development/04.lists').seed(knexInstance);
  await require('../src/seeds/development/05.items').seed(knexInstance);
  await require('../src/seeds/development/06.list-items').seed(knexInstance);

  knexInstance.destroy();
}
